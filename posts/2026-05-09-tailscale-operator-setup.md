---
date: '2026-05-09'
title: "Evolution of Cluster Access: From Allowlist to Tailscale"
description: "How my approach to accessing my cluster evolved from IP allowlisting to the Tailscale Operator."
---
## Evolution of Cluster Access: From Allowlist to Tailscale

Securing access to Kubernetes is a balancing act. You want it completely locked down from the public internet, but you also need to be able to easily deploy things to it. 

Recently, I needed to perform some rolling updates on my Oracle Kubernetes Engine (OKE) cluster. Because I was on a business trip, running `kubectl` from my local machine wasn't going to work.

Here is how I completely changed my approach to cluster access, switching from basic IP allowlisting to integrating the cluster itself with my exiting Tailscale tailnet.

### Starting simple: just allowlist my house

When I first stood up the cluster, I did the simple and obvious step to secure my OCI infrastructure: while building out my OpenTofu configuration for my infrastructure, I made sure that I only allowed my home IP address. This works great 99% of the time, as long as I'm home which is almost always where I'm connecting to resource anyways.

The problem, of course, is that I am not always at home. These days I do a decent bit of business travel for my job. I tried to push a change from a hotel in New York City, thousands of miles away from home. I needed a way to take my home network with me.

### A bastion and an SSH tunnel

The obvious workaround was to keep using my home IP, just from somewhere else. I have an always-on rackmount server at the house, which is provisioned as a Tailscale exit node, so I tunneled through it by modifying the Tailscale configuration on my laptop. Another trick that works in a pinch if you don't have an exit node is to set up a SOCKS5 proxy by using a host in the network as a bastion:

```bash
ssh -o StrictHostKeyChecking=no -D 8080 -q -N dylan@my-bastion-host &
```

`-D 8080` opens a SOCKS proxy on port 8080, `-N` tells SSH not to run a remote command, and `-q` keeps it from cluttering the terminal. You can then use `127.0.0.1:8080` via the `HTTPS_PROXY` environment variables to interact with the Kubernetes control plane, like so:


```bash
HTTPS_PROXY=socks5://127.0.0.1:8080 kubectl get nodes
```

This, however, creates a central point of failure - without this bastion it's not possible to connect without a workaround like temporarily allowlisting the IP address you're on in the OCI security list. What I really wanted was for the cluster itself to be reachable from *me*, now matter where I am, not from a specific place, and not with an allowlist update.

### Putting the cluster on my tailnet

While in the LaGuardia Airport I had some downtime so I started looking into deploying the [Tailscale Kubernetes Operator](https://tailscale.com/kb/1236/kubernetes-operator/).

The idea here is simple: instead of poking a hole in the firewall for my IP, I let the cluster join my tailnet. The operator runs inside the cluster, and with its API server proxy enabled, the control plane shows up as just another node on my Tailscale network. No public exposure, no bastion, no SOCKS proxy, no nonsense.

To make this happen, I first had to set up the proper access in the Tailscale admin console. The operator needs permission to authenticate and create devices on the tailnet, so I created a new OAuth client. It's crucial that this client is granted **Write** access for both **Devices** and **Auth Keys**, and assigned the `tag:k8s-operator` tag. If that tag doesn't exist, like it didn't in my case, it's necessary to create it first in the console as well.

But just giving it a tag isn't enough; Tailscale's access controls (ACLs) are strict by design. I also had to explicitly configure tag ownership in my tailnet's ACL file so the operator was authorized to manage its own resources. It looks like this:

```json
  "tagOwners": {
    "tag:k8s-operator": ["dylanmtaylor@github"],
    "tag:k8s":          ["tag:k8s-operator"]
  }
```

This configuration declares two things: my Tailscale identity (`dylanmtaylor@github`) is allowed to run devices tagged with `k8s-operator`, and the operator itself is allowed to provision downstream proxies tagged with `k8s`. I also had to toggle **Enable HTTPS Certificates** on the MagicDNS settings page.

With the permissions sorted and the operator deployed via Helm, setting up my laptop was a simple one-liner:

```bash
tailscale configure kubeconfig <operator-hostname>
```

That command updates `~/.kube/config` to point at the Tailscale address for the cluster and installs an auth plugin for my Tailscale identity.

### In Summary

The IP allowlist was fine until I left the house. If you're still updating your allowlist every time you need to connect from an airport, coffee shop, or hotel IP, do yourself a favor and check out the Tailscale operator. This make connecting from anywhere a breeze as long as I'm on my laptop joined to my tailnet.
