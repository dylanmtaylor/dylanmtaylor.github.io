---
date: '2026-03-12'
title: Mirroring Docker Hardened Images to ECR with regclient
description: How to work around ECR's lack of pull-through cache support for dhi.io by using regsync to automatically mirror Docker Hardened Images into your own ECR repositories.
---
## Mirroring Docker Hardened Images to ECR with regclient

I wrote about [switching to Docker Hardened Images](/posts/2025-12-27-switching-to-docker-hardened-images) on my personal Kubernetes cluster a few months ago. At work, we've been adopting them too. DHI images are minimal, distroless at runtime, and come with SBOMs and attestations out of the box. Now that they're free for everyone, there's really no reason not to use them.

There's one problem though: if you're running on AWS and using ECR pull-through cache to avoid Docker Hub rate limits and keep your image pulls fast and local, you're out of luck. ECR's pull-through cache [doesn't support `dhi.io`](https://github.com/aws/containers-roadmap/issues/2727) as an upstream registry. It supports Docker Hub, GitHub Container Registry, Quay, and a handful of others, but not the DHI registry. There's an open feature request for it, but who knows when (or if) AWS will add it.

So we built a workaround: use [regclient](https://regclient.org/)'s `regsync` tool to mirror the images ourselves on a schedule.

### What is regsync?

[regsync](https://regclient.org/usage/regsync/) is part of the regclient project -- a set of tools for working with container registries. regsync specifically handles mirroring images between registries. You give it a YAML config that defines source and target registries, credentials, and which repositories to sync, and it copies everything over. It supports tag filtering, multi-arch manifests, and a `fastCopy` mode that copies blobs directly between registries without pulling them to the local machine first. That last part is important -- it means the GitHub Actions runner doesn't need to have enough disk space to hold every image layer.

### The GitHub Actions Workflow

Here's the workflow we're running. It triggers on pushes to main (so config changes take effect immediately), on an hourly schedule (to pick up new upstream tags), and manually via `workflow_dispatch` for when you just want to force a sync:

```yaml
name: Mirror DHI Images to ECR

on:
  push:
    branches: [main]
  schedule:
    - cron: "0 * * * *"
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

env:
  AWS_REGION: us-east-1
  AWS_ACCOUNT_ID: "123456789012"

jobs:
  mirror:
    runs-on: ubuntu-24.04-arm
    steps:
      - uses: actions/checkout@v6

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::${{ env.AWS_ACCOUNT_ID }}:role/GitHubActionsRole
          aws-region: ${{ env.AWS_REGION }}

      - name: Get ECR token
        id: ecr-token
        run: echo "token=$(aws ecr get-login-password --region ${{ env.AWS_REGION }})" >> "$GITHUB_OUTPUT"

      - name: Install regclient
        run: |
          curl -sL https://github.com/regclient/regclient/releases/latest/download/regctl-linux-arm64 -o /usr/local/bin/regctl && chmod +x /usr/local/bin/regctl
          curl -sL https://github.com/regclient/regclient/releases/latest/download/regsync-linux-arm64 -o /usr/local/bin/regsync && chmod +x /usr/local/bin/regsync

      - name: Sync images
        env:
          ECR_REGISTRY: ${{ env.AWS_ACCOUNT_ID }}.dkr.ecr.${{ env.AWS_REGION }}.amazonaws.com
          ECR_TOKEN: ${{ steps.ecr-token.outputs.token }}
          DHI_USER: ${{ secrets.DOCKERHUB_USERNAME }}
          DHI_PASS: ${{ secrets.DOCKERHUB_TOKEN }}
        run: regsync once -c regsync.yaml -v info
```

A few things to note:

- We're using OIDC authentication (`id-token: write`) to assume an IAM role rather than storing long-lived AWS credentials as secrets. This is the right way to do AWS auth from GitHub Actions.
- The runner is `ubuntu-24.04-arm` because ARM runners are slightly cheaper than x86 on GitHub Actions. regsync copies manifests and blobs directly between registries, so it syncs multi-arch images (including x86) regardless of what architecture the runner itself is.
- DHI uses your Docker Hub credentials for authentication. The images are free to use, but `dhi.io` doesn't allow unauthenticated pulls -- it's a separate registry that authenticates against Docker Hub.
- `regsync once` runs a single sync pass and exits, which is what you want in CI. There's also a `server` mode that runs continuously, but that's more suited for a long-running container.

### The regsync Configuration

The `regsync.yaml` file defines where to pull from, where to push to, and what to sync:

```yaml
version: 1

defaults:
  skipDockerConfig: true

creds:
  - registry: dhi.io
    user: "{{ env \"DHI_USER\" }}"
    pass: "{{ env \"DHI_PASS\" }}"
    repoAuth: true
  - registry: "{{ env \"ECR_REGISTRY\" }}"
    user: AWS
    pass: "{{ env \"ECR_TOKEN\" }}"

x-deny-compliance: &deny-compliance
  tags:
    deny:
      - ".*-fips.*"
      - ".*-sfw.*"

sync:
  - source: dhi.io/node
    target: "{{ env \"ECR_REGISTRY\" }}/dhi-io/node"
    type: repository
    fastCopy: true
    <<: *deny-compliance

  - source: dhi.io/python
    target: "{{ env \"ECR_REGISTRY\" }}/dhi-io/python"
    type: repository
    fastCopy: true
    <<: *deny-compliance
```

The `x-deny-compliance` YAML anchor is worth calling out. DHI publishes FIPS and SFW (secure frameworks) variants of their images with tags like `3.12-fips` or `3.12-sfw`. These compliance-specific variants are paywalled, and we don't need them for our use case, so we exclude them with a tag deny list. The YAML anchor lets you apply the same filter to every sync entry without repeating yourself.

### Adding More Images

To mirror additional DHI images, just add more entries to the `sync` list:

```yaml
  - source: dhi.io/nginx
    target: "{{ env \"ECR_REGISTRY\" }}/dhi-io/nginx"
    type: repository
    fastCopy: true
    <<: *deny-compliance
```

You'll also need to make sure the ECR repository exists before the first sync. ECR recently added support for [creating repositories on push](https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-ecr-creating-repositories-on-push/), but if you're not using that, you can create them manually or manage them in Terraform like we do.

### Why Not Just Pull Directly from dhi.io?

You could, and for small-scale usage it works fine. But there are a few reasons to mirror:

- **Rate limits.** Docker Hub (and by extension dhi.io) has pull rate limits. If you're running a large cluster with frequent deployments or node scaling events, you'll hit them. ECR has no pull rate limits within the same region.
- **Latency.** Pulling from ECR in the same region as your EKS cluster is significantly faster than pulling from an external registry.
- **Availability.** If dhi.io or Docker Hub has an outage, your deployments still work because the images are already in ECR. We've experienced login failures and 503 errors during image pulls from dhi.io -- not frequently, but enough that you don't want to depend on it for production deployments.
- **Compliance.** Some organizations require all container images to come from an internal registry for audit and scanning purposes.

### Bottom Line

Until AWS adds `dhi.io` as a supported pull-through cache upstream, regsync is a clean workaround. The setup takes maybe 30 minutes, runs on a GitHub Actions schedule, and gives you all the benefits of local ECR images without waiting on a feature request.
