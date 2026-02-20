---
date: '2026-02-19'
title: Switching to Let's Encrypt on Kubernetes with cert-manager and Cloudflare DNS
description: How I replaced self-signed certificates with automated Let's Encrypt TLS on my Kubernetes cluster using cert-manager, DNS-01 validation through Cloudflare, and External Secrets Operator for secure token management.
---
## Switching to Let's Encrypt on Kubernetes with cert-manager and Cloudflare DNS

[![Let's Encrypt](/images/blog/2026/02/letsencrypt-logo-horizontal.svg)](https://letsencrypt.org/)

When I was running NGINX Ingress, TLS termination happened at the OCI Application Load Balancer (ALB) level. I could attach a certificate directly to the load balancer and it handled everything. But when I [migrated to Envoy Gateway](/posts/2025-12-24-migrating-from-nginx-ingress-to-envoy-gateway), that changed. Envoy provisions a Network Load Balancer (NLB) instead of an ALB, and NLBs operate at Layer 4 (TCP/UDP). They just pass TCP traffic through without inspecting or terminating TLS. TLS termination moves to the Envoy proxy pods themselves, which means the cluster needs to manage its own certificates.

I had cert-manager generating self-signed certs for this, and it worked fine in practice. Cloudflare's flexible SSL mode would present a real certificate to visitors, so end users never saw a browser warning. But the connection between Cloudflare and my origin wasn't encrypted with a trusted certificate. It was a bit of a hack, and I wanted to fix it properly.

The obvious answer was [Let's Encrypt](https://letsencrypt.org/). Free, automated, trusted certificates. I already had [cert-manager](https://cert-manager.io/) installed and working, so it was really just a matter of swapping out the issuer.

### What is DNS-01 and Why Use It?

My certificate covers both `dylanmtaylor.com` and `*.dylanmtaylor.com`. A wildcard. Let's Encrypt supports two ways to prove you own a domain: HTTP-01, where you serve a file at a well-known URL on your web server, and DNS-01, where you create a TXT record in your domain's DNS. HTTP-01 is simpler, but it can't be used for wildcard certificates. A wildcard covers arbitrary subdomains, and serving a file on the apex domain doesn't prove you control all of them. DNS control does. So DNS-01 it is.

In practice, this means cert-manager uses the Cloudflare API to create a `_acme-challenge.dylanmtaylor.com` TXT record with a token that Let's Encrypt provides. Let's Encrypt queries DNS, sees the record, and issues the certificate. cert-manager then cleans up the TXT record. The whole thing is automated, including on renewal, so I don't have to think about it.

### The Cloudflare API Token

cert-manager needs a Cloudflare API token with permission to create DNS records in my zone. The token is scoped to just the `dylanmtaylor.com` zone with only the permissions it needs to manage DNS records. Nothing else. I didn't want to store this in my Kubernetes manifests since the repository is public and Kubernetes secrets are only base64 encoded, not encrypted. I'm already using [External Secrets Operator](https://external-secrets.io/) to pull secrets from OCI Vault for other things like my Docker Hub credentials, so I just stored the Cloudflare token there too and created an `ExternalSecret` to sync it into the `cert-manager` namespace:

```yaml
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: cloudflare-dns-token-dylanmtaylor-com
  namespace: cert-manager
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: oci-vault
    kind: ClusterSecretStore
  target:
    name: cloudflare-dns-token-dylanmtaylor-com
  data:
    - secretKey: api-token
      remoteRef:
        key: cloudflare-dns-token-dylanmtaylor-com
        property: api-token
```

The `ClusterSecretStore` connects to OCI Vault using instance principal authentication, so there are no credentials to manage for the secret store itself. The compute instance's identity is the credential. I wrote about this setup a bit in my [Oracle Cloud post](/posts/2025-02-28-exploring_oracle_cloud_infrastructure).

### The New Issuer

With the token available as a Kubernetes secret, the `letsencrypt-prod` ClusterIssuer is straightforward:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <email>
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
      - dns01:
          cloudflare:
            apiTokenSecretRef:
              name: cloudflare-dns-token-dylanmtaylor-com
              key: api-token
```

When cert-manager needs to prove domain ownership, it uses the Cloudflare API to create a `_acme-challenge` TXT record, Let's Encrypt verifies it, and the certificate is issued. This all happens automatically on renewal too, so I don't have to think about it again.

### Flipping the Switch

The actual switchover was anticlimactic. I changed the issuer reference on my `Certificate` resource and the annotation on my `Gateway` from `selfsigned` to `letsencrypt-prod`:

```yaml
issuerRef:
  name: letsencrypt-prod  # was: selfsigned
  kind: ClusterIssuer
```

```yaml
cert-manager.io/cluster-issuer: letsencrypt-prod  # was: selfsigned
```

That's it. Two lines. cert-manager picked up the change, ran the DNS-01 challenge, and within a couple of minutes I had a valid wildcard certificate. The old `selfsigned` issuer is still around for my `.local` domain that I use on the internal network, where trusted certificates aren't needed.

### The Result

The full chain is now: OCI Vault stores the Cloudflare API token, External Secrets Operator syncs it into a Kubernetes secret, cert-manager uses it to solve DNS-01 challenges, Let's Encrypt issues the certificate, and Envoy Gateway terminates TLS with it. Certificates auto-renew before expiry, and the whole thing is declarative YAML in version control. I was also able to switch Cloudflare's SSL/TLS mode from Flexible to Full (Strict), which means Cloudflare now validates the origin certificate on every request. No more relying on Cloudflare's flexible SSL as a crutch. Just proper end-to-end encryption.

My cluster configuration is available in my [Kubernetes infrastructure repository](https://github.com/dylanmtaylor/dylanmtaylor-kubernetes) if you want to see the full manifests.
