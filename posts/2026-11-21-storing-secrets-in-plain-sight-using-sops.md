---
date: '2026-11-21'
title: "Storing Secrets in Plain Sight Using SOPS"
description: How we manage Kubernetes secrets directly in a GitOps repository for ArtCraft using SOPS, age, and Flux -- without running an external secrets vault.
---
## Storing Secrets in Plain Sight Using SOPS

In my [last post](/posts/2026-11-09-becoming-a-maintainer-of-the-artcraft-crafting-apps), I mentioned that a big chunk of my time lately has gone into building out the Kubernetes infrastructure for ArtCraft, managed with Flux in a GitOps repository. Almost immediately, you run into the classic GitOps problem: everything in the cluster is supposed to live in Git, except the things you really, *really* shouldn't put in Git -- API tokens, OAuth client secrets, database passwords, and registry credentials.

Kubernetes `Secret` manifests are only base64-encoded, not encrypted. Committing a plain `Secret` to a public repository is basically the same as pasting your credentials into a gist. On my personal Oracle Cloud cluster, I solved this with [External Secrets Operator and OCI Vault](/posts/2026-02-19-switching-to-lets-encrypt-on-kubernetes-with-cert-manager-and-cloudflare-dns), using instance principals so the cluster could authenticate to the cloud vault without any static credentials. At work on AWS, we do the same kind of thing with AWS Secrets Manager and IAM roles.

ArtCraft's cluster is different. We're running K3s on bare metal, not inside a cloud environment. There's no cloud KMS or managed secrets vault sitting underneath the nodes with instance principals ready to go. We could have deployed and operated something like HashiCorp Vault ourselves, or wired up an external cloud vault just to hold a dozen secrets, but that adds another stateful dependency to keep alive, upgrade, and back up. I wanted something simpler that still kept everything declarative in one repository.

The answer we landed on is [SOPS](https://getsops.io/) paired with [age](https://age-encryption.org/) and Flux's built-in decryption support. It lets us commit encrypted secrets right next to the manifests that use them, in a GitHub repository, in plain sight.

### What Is SOPS, and Why Pair It with age?

SOPS (Secrets OPerationS) started at Mozilla and is now a CNCF sandbox project. The core idea is straightforward: instead of encrypting an entire file into an unreadable binary blob, SOPS understands structured formats like YAML, JSON, etc., and only encrypts the *values*. The keys and structure stay in plaintext.

SOPS itself doesn't lock you into a single encryption backend -- it supports AWS KMS, GCP KMS, Azure Key Vault, HashiCorp Vault, PGP, and `age`. For a bare-metal cluster managed by a small open source team, `age` is easily the cleanest choice:

- **No cloud dependency.** You don't need an AWS account or a managed KMS just to decrypt a YAML file.
- **No PGP headaches.** Anyone who has dealt with GPG keyrings, subkeys, keyservers, and expiring keys in CI knows how painful PGP gets. `age` keys are just a single public/private keypair generated with `age-keygen`, using modern cryptography.
- **Native Flux support.** Flux's `kustomize-controller` speaks SOPS and `age` out of the box. There's no extra operator, webhook, or sidecar to deploy.

Generating a keypair takes one command:

```bash
mkdir -p ~/.config/sops/age
age-keygen -o ~/.config/sops/age/keys.txt
chmod 600 ~/.config/sops/age/keys.txt
```

That writes a private key (`AGE-SECRET-KEY-...`) to `keys.txt` and prints the corresponding public key (`age1...`). You hand the private key to the cluster once, back it up somewhere safe, and put the public key right in the repository.

### Configuring `.sops.yaml`

The real magic for Kubernetes manifests happens in `.sops.yaml` at the root of the repository:

```yaml
creation_rules:
  - path_regex: .*\.sops\.ya?ml$
    encrypted_regex: ^(data|stringData)$
    age: age1examplepublickey000000000000000000000000000000000000000000000
```

A few things to note here:

- `path_regex` scopes the rule to files named `*.sops.yaml` or `*.sops.yml`, so naming conventions make it obvious at a glance which manifests are encrypted.
- `encrypted_regex: ^(data|stringData)$` is the key line. It tells SOPS to encrypt *only* the values inside `data` or `stringData`, leaving `apiVersion`, `kind`, `metadata`, and `type` completely readable.
- `age` holds the cluster's public key, which isn't sensitive and is meant to be checked into Git.

Because metadata and key names remain in plaintext, pull requests stay reviewable. When someone opens a PR adding a secret, a reviewer can look at the diff and immediately confirm the `Secret` name, target namespace, and exact key names without ever seeing the underlying secret values.

### What an Encrypted Secret Actually Looks Like

Once you write a normal Kubernetes `Secret` manifest with `stringData` and run `sops --encrypt --in-place path/to/secret.sops.yaml`, the file on disk looks like this:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example-credentials
  namespace: apps
type: Opaque
stringData:
  username: ENC[AES256_GCM,data:...,iv:...,tag:...,type:str]
  password: ENC[AES256_GCM,data:...,iv:...,tag:...,type:str]
sops:
  age:
    - recipient: age1examplepublickey000000000000000000000000000000000000000000000
      enc: |
        -----BEGIN AGE ENCRYPTED FILE-----
        ...
        -----END AGE ENCRYPTED FILE-----
  encrypted_regex: ^(data|stringData)$
  lastmodified: "2026-11-21T23:00:00Z"
  mac: ENC[AES256_GCM,data:...,iv:...,tag:...,type:str]
  version: 3.13.3
```

One detail here that's easy to overlook -- and honestly one of my favorite things about SOPS -- is that `mac` field in the `sops:` block. SOPS generates a random AES-256-GCM data key per file, encrypts each value under `data`/`stringData` with it, wraps that data key with the `age` public key, and then computes an authenticated MAC over *every* field in the document, including the unencrypted ones.

Why does that matter? Think about what would happen without it: someone with write access to a pull request (or a compromised branch) could leave the encrypted `stringData` untouched and quietly change `metadata.namespace` from `monitoring` to a namespace where an untrusted workload runs, hoping to get Flux to create the decrypted secret somewhere they can read it. Because the MAC covers the entire file, modifying `metadata.namespace` without the private key breaks the MAC, and SOPS refuses to decrypt the file.

### Letting Flux Handle Decryption

On the cluster side, setting up decryption is a one-time secret creation in `flux-system`:

```bash
kubectl -n flux-system create secret generic sops-age \
  --from-file=age.agekey="$HOME/.config/sops/age/keys.txt"
```

Then each Flux `Kustomization` that contains encrypted manifests just points at that secret:

```yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: apps
  namespace: flux-system
spec:
  interval: 10m
  sourceRef:
    kind: GitRepository
    name: flux-system
  path: ./apps/production
  prune: true
  wait: true
  decryption:
    provider: sops
    secretRef:
      name: sops-age
```

That's it. When Flux reconciles `main`, `kustomize-controller` builds the kustomization, decrypts any SOPS-encrypted resources in memory using `sops-age`, and applies the resulting Kubernetes `Secret` objects to the cluster. Secrets stay encrypted in Git, stay encrypted in transit from GitHub, and are only decrypted inside the cluster during reconciliation.

### Onboarding Contributors Without Sharing Private Keys

One unexpected benefit we ran into almost right away is how nicely this works with outside contributors.

When a contributor maintains a service running on our cluster and needs to add or update environment variables, the old workflow was awkward: DM credentials over Discord, ask for someone's PGP key, or have an admin manually edit secrets out of band. With SOPS and `age`, the cluster's public key is already sitting in `.sops.yaml` in the repo.

A contributor doesn't need the private key to encrypt a secret for the cluster. They can write a `Secret` YAML file with their new `stringData` values, run:

```bash
sops --encrypt --in-place apps/production/my-service/secrets.sops.yaml
```

and open a pull request. Because encryption only needs the public `age1...` recipient from `.sops.yaml`, they never have to send plaintext credentials over chat, and we never have to hand out the cluster's decryption key just so someone can supply config for their own app.

There is one quirk to keep in mind with this workflow: while anyone with the public key can encrypt a *new* file from scratch, editing an *existing* encrypted file with `sops` requires decrypting it first so SOPS can verify and recompute the MAC. In practice, that means a contributor without the private key either encrypts a fresh file (replacing the old one if they own all the keys in it) or sends an `age`-encrypted block using the same public key for an admin to merge in. Still miles better than passing secrets around in plaintext.

### Trade-offs

SOPS isn't a silver bullet, and there are a few real trade-offs worth calling out before adopting it:

- **Git history is forever.** This is the big one, especially if you have a public repository. If your `age` private key ever leaks, rotating the `age` key alone isn't enough -- an attacker with the leaked private key can check out older commits and decrypt every historical value. You have to rotate *every* secret that was ever encrypted with that key. Treat the `age` private key like a root credential.
- **No dynamic secrets or automatic rotation.** SOPS is strictly for static secrets. If you need short-lived database credentials, automatic password rotation, or fine-grained audit logs of who read which secret when, an external secrets manager like AWS Secrets Manager, OCI Vault, or HashiCorp Vault is still the right tool.
- **Key backup and access management.** If you lose the private key and lose the cluster, your encrypted files in Git are just random noise. Back it up somewhere reliable outside the cluster.
- **It doesn't encrypt secrets inside etcd.** Once Flux decrypts a manifest and applies it, it's a normal Kubernetes `Secret` in the cluster. You still want encryption at rest enabled for Kubernetes secrets and tight RBAC around who can `get` secrets (especially `flux-system/sops-age`).

### Bottom Line

For cloud-hosted clusters where a managed vault and pod/instance identity are already sitting right there, External Secrets Operator is still my go-to. On bare metal, though, SOPS with `age` and Flux hits a really nice sweet spot. Everything stays declarative in one repository, pull requests stay readable and schema-validated in CI, contributors can safely submit encrypted secrets without ever holding the private key, and there's zero extra secret-management infrastructure to babysit.
