---
date: '2025-12-30'
title: Defending Against Credential Stuffing with Cloudflare Workers and IP Intelligence
description: How we used Cloudflare Workers, Turnstile, and Spur IP intelligence to stop an attacker using residential proxies to hit our authentication APIs
---
## Defending Against Credential Stuffing with Cloudflare Workers and IP Intelligence

Recently, we noticed a spike in failed authentication attempts against our mobile app's API. Someone was hitting our signin and signup endpoints with what looked like credential stuffing attacks -- automated requests trying to validate stolen credentials or create fraudulent accounts. The tricky part? They were using residential proxies, which made traditional IP-based blocking ineffective.

### The Problem with Residential Proxies

Most bot protection relies heavily on IP reputation. Datacenter IPs, known VPN exit nodes, and Tor relays are easy to identify and block. But residential proxies route traffic through real home internet connections, making the requests appear to come from legitimate users. Rate limiting by IP doesn't work well either, since the attacker can rotate through thousands of residential IPs.

We needed a multi-layered approach that could identify malicious traffic even when it appeared to come from legitimate residential connections.

### What We Tried First: JA4 Fingerprinting

Before landing on our current solution, we tried blocking traffic based on JA4 fingerprints. JA4 is a TLS fingerprinting method that creates a hash based on how a client negotiates its TLS connection -- things like supported cipher suites, extensions, and their order. Since different HTTP clients (browsers, curl, Python requests, etc.) have distinct TLS implementations, the fingerprint can help identify what's actually making the request.

Cloudflare exposes JA4 fingerprints in request headers, so we tried blocking the fingerprints associated with the attack traffic. This worked initially, but it turned out to be a double-edged sword. The attacker's tooling shared fingerprints with legitimate client libraries, and we started blocking real customer traffic. We had to back off this approach quickly.

### The Solution: Cloudflare Workers as an API Gateway

Since our API was already behind Cloudflare, we deployed a Worker that intercepts authentication requests before they reach our backend. The Worker acts as a security gateway, validating requests against multiple signals before allowing them through.

The Worker is written in TypeScript and exports a fetch handler that inspects the request path. If the path matches `/auth/signin` or `/auth/signup`, it routes to the appropriate handler function. Everything else passes through to the origin untouched.

The Worker is configured with route patterns in `wrangler.jsonc` to only intercept the specific authentication endpoints we care about.

### Layer 1: Cloudflare Turnstile

[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) is a CAPTCHA alternative that runs challenges in the background without user interaction. Our mobile app includes the Turnstile SDK, which generates a token that gets sent along with authentication requests. The Worker verifies this token server-side.
```bash
curl -X POST https://challenges.cloudflare.com/turnstile/v0/siteverify \
  -F "secret=$TURNSTILE_SECRET" \
  -F "response=$TOKEN" \
  -F "remoteip=$IP"
```

If the token is missing or invalid, the request gets rejected with a 401 before it ever hits our backend. This stops basic automation that doesn't bother implementing the Turnstile SDK.

### Layer 2: Spur IP Intelligence

Turnstile alone wasn't enough for two reasons. First, sophisticated attackers can solve Turnstile challenges, especially if they're using real devices in a botnet or have implemented the SDK in their automation tooling. Second, and more pressing for us, Turnstile requires a client-side SDK integration. Our mobile apps needed updates to include the Turnstile token in authentication requests, and iOS and Android app store reviews take time. We needed something that could block the attack immediately without waiting for a client update to roll out.

[Spur](https://spur.us/) provides IP intelligence that can identify residential proxies, VPNs, datacenter IPs, and other suspicious infrastructure. Their API returns risk indicators for any IP address:

```bash
curl -s "https://api.spur.us/v2/context/$IP" \
  -H "Token: $SPUR_TOKEN"
```

The response includes an array of risk flags and infrastructure classification. We block requests that match specific high-risk patterns -- `CALLBACK_PROXY`, `TUNNEL`, and `LOGIN_BRUTEFORCE` -- as well as any traffic originating from datacenter infrastructure.

The `CALLBACK_PROXY` risk is particularly useful -- it identifies residential proxy services where traffic is being routed through compromised or rented home connections. This catches exactly the type of attack we were seeing.

### Putting It Together

For signup requests, we run both checks. The Spur check happens first since it's the stronger signal against residential proxies:

1. Verify the request has a valid IP (Cloudflare provides this via the `cf-connecting-ip` header)
2. Query Spur for IP intelligence
3. Block if the IP is flagged as a proxy, tunnel, or datacenter
4. Optionally verify Turnstile token (we're rolling this out per-platform)
5. If all checks pass, forward the request to the backend with an `x-turnstile-result: allow` header

For signin requests, we primarily rely on Turnstile since we want to minimize friction for returning users, but we can enable Spur checks if we see targeted attacks.

### Results

After deploying the Worker, we saw an immediate drop in fraudulent authentication attempts. The combination of Turnstile and Spur's residential proxy detection caught traffic that would have sailed through traditional bot protection.

The Worker approach has some nice properties:

- **No backend changes required** -- the Worker intercepts and filters traffic transparently
- **Low latency** -- Workers run at the edge, close to users, and the Spur API is fast
- **Easy to iterate** -- we can adjust blocking rules without redeploying our main application
- **Graceful degradation** -- if Spur's API is down, we fall back to allowing the request rather than breaking authentication

### Lessons Learned

A few things we learned from this incident:

1. **Residential proxies are the new normal** -- attackers have moved beyond datacenter IPs. You need intelligence that can identify proxy services routing through residential connections.

2. **Layer your defenses** -- no single signal is perfect. Turnstile stops basic automation, Spur catches sophisticated proxy usage, and together they're much more effective than either alone.

3. **Cloudflare Workers are great for this pattern** -- intercepting requests at the edge before they hit your backend is a clean way to add security controls without touching your application code.

4. **Fail open carefully** -- we chose to allow requests through if Spur's API fails, rather than blocking all authentication. This is a tradeoff between security and availability that depends on your risk tolerance.

The attacker eventually gave up and moved on. Whether they found an easier target or decided we weren't worth the effort, the attack stopped within a day of deploying these controls.
