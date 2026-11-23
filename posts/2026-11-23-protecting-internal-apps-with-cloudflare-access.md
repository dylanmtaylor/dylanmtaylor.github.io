---
date: '2026-11-23'
title: "Protecting Internal Apps with Cloudflare Access"
description: How I protected ArtCraft's internal tools behind Cloudflare Access.
---
## Protecting Internal Apps with Cloudflare Access

Following up on [my last post about managing secrets with SOPS](/posts/2026-11-21-storing-secrets-in-plain-sight-using-sops), the next problem we had to figure out on the ArtCraft cluster was how contributors and maintainers should actually access web-based tools. We run things like Grafana, Weblate, and internal build tooling, and I didn't want to expose their login pages directly to the public internet or force everyone onto a VPN.

On my personal Kubernetes cluster, I solved this by [putting the control plane on my Tailscale tailnet](/posts/2026-05-09-tailscale-operator-setup), and at work we use an always-on VPN on client devices which solves this by default just by limiting ingress to known VPN IPs. That works great when it's just me and my own devices or there's an org-wide standard solution deployed to everyone's device already. For an open source project with maintainers, developers, and translators spread around the world, asking everyone to install a VPN client just to open a browser dashboard is too much friction. On the other hand, leaving internal apps open to the internet and hoping none of them ever have an auth bypass bug isn't great either.

Since ArtCraft already uses Cloudflare, [Cloudflare Zero Trust](https://www.cloudflare.com/zero-trust/products/access/) (specifically Cloudflare Access with a tunnel) made a lot of sense. Every request gets authenticated at Cloudflare's edge against our SSO policies before it ever hits the cluster, and the whole thing is managed as code with OpenTofu and Flux.

### No Inbound Ports with Cloudflare Tunnel

Because the cluster runs on bare metal nodes, the cleanest way to route traffic in without opening firewall ports or exposing node IPs is `cloudflared`. Instead of pointing DNS records at our servers, pods inside the cluster open outbound connections to Cloudflare's edge and forward traffic directly to the internal Envoy Gateway service.

For maximum security and availability, I'm running `cloudflared` as a Kubernetes `DaemonSet` using the [Docker Hardened Image](/posts/2025-12-27-switching-to-docker-hardened-images) (`dhi.io/cloudflared`) as a non-root user with a read-only root filesystem and all capabilities dropped. Having one pod per node means every host maintains its own tunnel connections, so if we lose a node or it's down for updates, ingress keeps working without interruption. The tunnel token lives right next to the manifest in Git, encrypted with SOPS.

### Gating Apps on Org Membership

With traffic flowing through Cloudflare, we use OpenTofu to configure DNS and our identity provider to put Cloudflare Access in front of each internal hostname.

For tools that only certain groups need, you can add a `team` field to the policy blocks so only members of a specific team (like `backend` or `frontend`) can get in. It also makes off-boarding simple: if someone leaves, they lose access automatically. We also customized the login and error screens so signing in feels like part of the project rather than a generic portal. For apps that support OAuth themselves, like Grafana and Weblate, we turned off local password login so nobody has to have separate accounts behind the gate.

### Verifying the JWT at Envoy Gateway

Putting Cloudflare Access in front of an app blocks unauthenticated users at the edge, which is already a big win. Still, you shouldn't just assume that all traffic reaching the cluster went through Access. A misconfigured tunnel route or an accidentally exposed port would bypass it completely if the origin never checks.

On every authenticated request, Cloudflare injects a signed JWT in the `Cf-Access-Jwt-Assertion` header and publishes its signing keys at `https://<team>.cloudflareaccess.com/cdn-cgi/access/certs`. Since we're already running Envoy Gateway on the cluster, we don't need to write JWT validation middleware or run `oauth2-proxy` sidecars. Envoy Gateway's `SecurityPolicy` CRD handles it directly per `HTTPRoute`:

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: grafana-cloudflare-access
spec:
  targetRefs:
    - group: gateway.networking.k8s.io
      kind: HTTPRoute
      name: grafana
  jwt:
    providers:
      - name: cloudflare-access
        issuer: https://your-team.cloudflareaccess.com
        remoteJWKS:
          uri: https://your-team.cloudflareaccess.com/cdn-cgi/access/certs
        extractFrom:
          headers:
            - name: Cf-Access-Jwt-Assertion
```

That way both sides are enforcing it: Cloudflare won't forward a request unless your GitHub identity matches the Access policy, and Envoy won't route it to the pod unless it has a valid JWT signed by Cloudflare's issuer.

### Carving Out Webhooks and API Paths

Browser sessions aren't the only traffic hitting some of these tools. Weblate, for instance, receives push webhooks from GitHub on `/hooks/` and handles automated REST API calls on `/api/` using its own API tokens. Neither of those can click through a browser-based GitHub OAuth flow, so gating the whole hostname breaks them right away. To handle that cleanly without punching a wide-open hole in the perimeter, we carve out path-scoped exceptions and lock them down as tightly as each caller allows.

In Cloudflare Access, we define path-scoped resources to bypass, since more specific path rules take precedence over the host-wide application. GitHub publishes its webhook delivery CIDRs (via https://api.github.com/meta), so the bypass policy only matches those IP ranges — any other caller hitting /hooks/ still gets stopped at Cloudflare Access. We mirror that in Envoy Gateway for defense-in-depth. Longer path prefixes win over / in the Gateway API, so browser traffic on / keeps strict JWT enforcement while exceptions route through a separate HTTPRoute without the JWT policy.

### A Couple Gotchas

There are a few practical limitations that are worth knowing ahead of time:

- Cloudflare Access supports GitHub, Google, and standard OIDC or SAML providers out of the box, but not arbitrary OAuth2. Discord, which a huge number of people in the community use, only implements plain OAuth2 rather than full OIDC. We ran into this with a community-facing tool where contributors sign in with Discord. Without running an OIDC bridge in the middle, we can't put Cloudflare Access in front of it the same way, so auth had to stay at the application layer there. We are investigating community-developed solutions to adapt Discord for Cloudflare Access.
- Cloudflare is in the critical path. Like any edge proxy, if Cloudflare Access or Tunnel has an outage, you're waiting on it to recover before you can reach your internal web UIs (unless you keep an out-of-band path like SSH or WARP around for cluster admins).

### In Summary

For internal web apps where, combining Cloudflare Access, Cloudflare Tunnel, and Envoy Gateway's `SecurityPolicy` has worked really well for us. We don't have to open any inbound ports, run separate auth proxy pods, or ask contributors to install VPN software, and because everything is defined in OpenTofu and Flux, adding a new internal service is just another pull request.
