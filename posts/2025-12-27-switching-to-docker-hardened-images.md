---
date: '2025-12-27'
title: Switching to Docker Hardened Images on My Kubernetes Cluster
description: How I migrated my Kubernetes cluster to use Docker Hardened Images now that they're free for everyone
---
## Switching to Docker Hardened Images on My Kubernetes Cluster

After [migrating from NGINX Ingress to Envoy Gateway](/posts/2025-12-24-migrating-from-nginx-ingress-to-envoy-gateway), I decided to tackle another security improvement on my cluster: switching to Docker Hardened Images (DHI).

### What Are Docker Hardened Images?

Docker recently [announced that Docker Hardened Images are now free for everyone](https://www.docker.com/blog/docker-hardened-images-for-every-developer/). These are minimal, security-focused container images designed to reduce the attack surface of your applications. They're distroless at runtime, meaning they strip out everything you don't need -- no shell, no package manager, no unnecessary binaries. The result is dramatically smaller images with significantly fewer CVEs.

What makes DHI different from other hardened image offerings is the transparency. Every image includes a complete SBOM (software bill of materials) and cryptographic attestations proving exactly how and where the image was built. Docker doesn't hide vulnerabilities or use proprietary CVE scoring to make their images look better than they are. If there's a vulnerability they haven't patched yet, you'll know about it.

### Why I Made the Switch

Running a Kubernetes cluster, even a small personal one, means you're responsible for the security of everything in it. Standard container images from Docker Hub often come with hundreds of packages you don't need, and each one is a potential attack vector. I was already following security best practices like running containers as non-root users, dropping all capabilities, and using seccomp profiles, but the base images themselves were still bloated.

With DHI being free now, there was no reason not to make the switch.

### The Images I'm Using

After migrating my deployments, here's what's running on my cluster:

- `dhi.io/nginx:1` - Powers my main website, file hosting, and PHP application frontends
- `dhi.io/php:8-fpm` - Runs PHP-FPM for my apps subdomain and other PHP applications
- `dhi.io/awscli:2` - Used in init containers to pull artifacts from Cloudflare R2
- `dhi.io/wait-for-it:0` - A simple utility for init containers that need to wait for DNS or services to be available
- `bitnami/git` - Used for content updater sidecars that pull from GitLab repositories
- `ghcr.io/dylanmtaylor/resume-builder` - My custom image for building my resume

The nginx image is particularly nice because it's already configured to run as a non-root user and listens on port 8080 by default, which aligns perfectly with Kubernetes security best practices.

For content updates, I'm using [Bitnami's git image](https://hub.docker.com/r/bitnami/git), which is also security-hardened. Bitnami images are non-root by default, regularly updated, and follow similar security principles to DHI. They have a minimal footprint while still including the tools you actually need.

I also have a custom `resume-builder` image that runs as a CronJob every 15 minutes. It clones my LaTeX resume from GitLab, builds it with XeLaTeX, and uploads the PDF to Cloudflare R2. This image is built on GitHub Actions and pushed to GitHub Container Registry. Since it's my own image, I have full control over what goes into it and can keep it minimal.

### Migration Notes

The migration was mostly straightforward, but there were a few things to keep in mind:

1. **Authentication**: DHI images are pulled from `dhi.io`, which requires Docker Hub credentials. I'm using External Secrets Operator to pull my Docker PAT from a secrets vault and create the `imagePullSecrets` automatically.

2. **User IDs**: The DHI images use specific non-root users. For nginx, that's UID 65532. I had to update my `securityContext` settings to match:

```yaml
securityContext:
  runAsUser: 65532  # nginx user in DHI image
  capabilities:
    drop: ["ALL"]
```

3. **No Shell**: Since these are distroless images, you can't exec into them with a shell for debugging. This is actually a feature, not a bug -- if an attacker compromises your container, they can't poke around.

4. **Port Changes**: The hardened nginx image listens on 8080 instead of 80, which is standard for non-root containers, as binding to ports under 1024 is priviliged on Linux systems.

### Security Context

With DHI, I'm now running all my workloads with a pretty locked-down security posture:

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: nginx
      image: dhi.io/nginx:1
      securityContext:
        runAsUser: 65532
        capabilities:
          drop: ["ALL"]
```

Combined with the minimal attack surface of the distroless images, this makes for a much more secure cluster.

### The tl;dr

If you're running containers in production (or even just for personal projects), there's really no reason not to use Docker Hardened Images now that they're free. The migration effort is minimal, and you get significantly improved security out of the box. The images are smaller, have fewer vulnerabilities, and follow security best practices by default.

My cluster configuration is available in my [Kubernetes infrastructure repository](https://github.com/dylanmtaylor/dylanmtaylor-kubernetes) if you want to see the full deployment manifests.
