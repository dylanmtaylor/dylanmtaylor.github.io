---
date: '2025-12-24'
title: Migrating My Kubernetes Cluster from NGINX Ingress to Envoy Gateway
description: How I modernized my Kubernetes traffic management by migrating from NGINX Ingress Controller to Envoy Gateway and the Gateway API, motivated by the upcoming retirement of Ingress NGINX
---
## Migrating from NGINX Ingress to Envoy Gateway on Oracle Kubernetes Engine

I've been running my personal infrastructure on Oracle Kubernetes Engine (OKE) with the NGINX Ingress Controller for a while now, and it's worked perfectly fine. But the recent announcement from the Kubernetes community about the [retirement of the NGINX Ingress Controller](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/) finally gave me the push I needed to migrate to something more modern: Envoy Gateway and the Gateway API.

### Why Now?

In November, the Kubernetes project announced that the NGINX Ingress Controller would be retired in March 2026. Apparently, it turns out the project has been struggling with maintainership for years -- only one or two people are doing the development work in their spare time. Despite being incredibly popular, thewer will be no more releases after March 2026: no bugfixes, and no security patches. Existing deployments will keep working, but you're on your own. That's not a situation I want to be in, so I figured I'd get ahead of it.

### My Setup

For context, my setup runs entirely on Oracle Cloud's "always free" tier. I'm fully taking advantage of the 4x ARM64 Ampere instances (1 CPU, 4 GiB RAM each) in an OKE cluster. This powers all of dylanmtaylor.com:

- Main website/blog
- File hosting (files.dylanmtaylor.com)
- Redirects (blog.dylanmtaylor.com, git.dylanmtaylor.com)
- A resume generation pipeline that runs as a CronJob

Everything is deployed through automation scripts with Helm and Kustomize, and I use OCI Object Storage for persistent file storage and hosting. Not bad for almost $0/month.

### Before and After

My old setup was effectively a bunch of Ingress resources with routing rules, handling my various subdomains. I had dedicated pods running for the redirects, which took up a very small amount of CPU and memory but nevertheless had some overhead to them.

The new setup uses Envoy Gateway with the Gateway API. Here's what the main Gateway resource looks like:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: dylanmtaylor-gateway
  namespace: dylanmtaylor
  annotations:
    oci.oraclecloud.com/load-balancer-type: lb
    service.beta.kubernetes.io/oci-load-balancer-shape: flexible
    service.beta.kubernetes.io/oci-load-balancer-shape-flex-min: 10
    service.beta.kubernetes.io/oci-load-balancer-shape-flex-max: 10
spec:
  gatewayClassName: eg
  listeners:
  - name: http
    port: 80
    protocol: HTTP
  - name: https
    port: 443
    protocol: HTTPS
    hostname: "*.dylanmtaylor.com"
    tls:
      mode: Terminate
      certificateRefs:
      - name: dylanmtaylor-com-tls
```

Routing is handled by HTTPRoute resources, for example:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: dylanmtaylor-routes
spec:
  parentRefs:
  - name: dylanmtaylor-gateway
  hostnames:
  - "dylanmtaylor.com"
  - "www.dylanmtaylor.com"
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: dylanmtaylor-service
      port: 80
```

### What's Better Now

The biggest win is the simplicity. Because of the annotations I'm using, Envoy Gateway automatically provisions an application Load Balancer with a pre-allocated static IP, which eliminates any manual load balancer configuration. This is still powered by the OCI native ingress controller under the hood.

The separation between infrastructure (Gateway) and application routing (HTTPRoute) is also much cleaner. HTTPRoutes give you path-based routing with regex, header-based routing, traffic splitting - all out of the box.

### Current State

My cluster now runs:
- 1 Gateway managing all external traffic
- Several HTTPRoutes for my various different subdomains (main site/blog, files, etc., plus HTTP-to-HTTPS redirect and a catch-all)
- 4 Envoy proxy replicas for HA on all of my nodes
- Automatic self-signed TLS termination with cert-manager (Cloudflare provides a "real" TLS certificate)

There's also some built-in metrics and tracing that I'm still exploring.

### Things I Learned

The Gateway API requires more upfront planning of listeners. I ended up with separate listeners for HTTP redirects, HTTPS with wildcard certs, HTTPS for the apex domain, and local development domains for testing.

Cert-manager integration works great, but you have to be explicit about certificate references in Gateway listeners—they're not inferred from annotations like with Ingress. It's actually cleaner once you get used to it.

### Bottom Line

If you're still running Ingress NGINX, I'd start planning your migration now rather than waiting until March 2026. The Gateway API is clearly where Kubernetes traffic management is headed, and the migration isn't that bad. My infrastructure feels more robust now, and I don't have to worry about running unsupported software.

The complete configuration is in my [Kubernetes infrastructure repository](https://github.com/dylanmtaylor/dylanmtaylor-kubernetes). Infrastructure is deployed via Terraform from my [infrastructure repository](https://gitlab.com/dylanmtaylor/terraform-dylanmtaylor-com).
