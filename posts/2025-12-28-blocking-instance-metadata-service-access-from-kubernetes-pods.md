---
date: '2025-12-28'
title: Blocking Instance Metadata Service Access from Kubernetes Pods
description: Why you should block pods from accessing the cloud instance metadata service when your nodes use instance principals, and how I implemented it on my cluster
---
## Blocking Instance Metadata Service Access from Kubernetes Pods

If you're running Kubernetes on cloud infrastructure like AWS or Oracle Cloud, there's a good chance your worker nodes have some level of cloud API access via instance principals (called instance profiles in AWS, or instance principals in OCI). This is convenient for things like pulling images from private registries, accessing secrets vaults, or interacting with cloud storage. But there's a catch: by default, any pod running on those nodes can hit the instance metadata service and potentially assume those same permissions.

### The Problem

Cloud providers expose a metadata service at a well-known IP address: `169.254.169.254`. This link-local address is accessible from any workload running on the instance without authentication. The metadata service provides information about the instance itself, but more critically, it can provide temporary credentials for whatever IAM role or principal is attached to the instance.

On my OKE cluster, I'm using instance principals to allow the External Secrets Operator to pull secrets from OCI Vault. The nodes need this access, but my application pods absolutely do not. If a container in one of my nginx pods got compromised, an attacker could curl the metadata service and potentially retrieve credentials to access my vault secrets or other cloud resources.

This isn't a theoretical concern. The [Capital One breach in 2019](https://krebsonsecurity.com/2019/08/what-we-can-learn-from-the-capital-one-hack/) famously exploited SSRF to access the EC2 metadata service and steal IAM credentials. AWS has since introduced IMDSv2 which requires a session token, but many environments still have IMDSv1 enabled for compatibility, and even IMDSv2 can be exploited if an attacker can make arbitrary HTTP requests from within a pod.

### The Solution: Network Policies

The cleanest way to block metadata service access is with Kubernetes NetworkPolicies. These operate at the network level, so even if an attacker has code execution in a container, they simply cannot reach the metadata endpoint.

Here's what I'm running on my cluster:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns-egress
  namespace: dylanmtaylor
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: kube-system
      ports:
        - protocol: UDP
          port: 53
    - to:
        - ipBlock:
            cidr: 0.0.0.0/0
            except:
              - 169.254.169.254/32
      ports:
        - protocol: TCP
          port: 443
        - protocol: TCP
          port: 80
```

This policy does a few things:

1. Allows DNS queries to kube-system (where CoreDNS runs)
2. Allows outbound HTTP/HTTPS to anywhere *except* the metadata service IP
3. Combined with a default-deny policy, this means pods can only make web requests and DNS lookups -- nothing else

The key line is `except: - 169.254.169.254/32`. This carves out the metadata service IP from the allowed egress range.

### Default Deny First

For NetworkPolicies to be effective, you need to start with a default deny policy. Without one, pods can communicate freely and your allow rules don't actually restrict anything. Here's my default deny:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: dylanmtaylor
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

This blocks all ingress and egress for every pod in the namespace. Then I layer on specific allow rules for legitimate traffic -- ingress from the Envoy Gateway namespace, DNS egress to kube-system, and HTTPS egress to the internet (minus the metadata service).

### Why Not Just Use IMDSv2?

AWS's IMDSv2 requires a PUT request to get a session token before you can access metadata. This does help prevent some SSRF attacks since many SSRF vulnerabilities only allow GET requests. But it's not a complete solution:

- If an attacker has code execution in your container, they can make PUT requests
- OCI's metadata service doesn't have an equivalent to IMDSv2
- Defense in depth means you should block it at the network level anyway

IMDSv2 is a good additional layer, but NetworkPolicies are the real fix.

### Pod Identity as an Alternative

Both AWS and OCI offer pod-level identity solutions (IRSA/EKS Pod Identity in AWS, Workload Identity in OCI) that let you assign IAM roles to specific service accounts rather than to the entire node. This is the "right" way to do cloud API access from pods -- each workload gets exactly the permissions it needs and nothing more.

On my cluster, External Secrets Operator uses instance principals because I'm running a basic OKE cluster that doesn't support Workload Identity (it requires the enhanced cluster type). For a production environment with multiple teams and workloads, pod identity is worth the extra cost and configuration effort.

### Testing It

You can verify the metadata service is blocked by exec'ing into a pod and trying to curl it:

```bash
kubectl exec -it deployment/nginx -n dylanmtaylor -- curl -s --connect-timeout 5 http://169.254.169.254/
```

With the NetworkPolicy in place, this should time out. Without it, you'd get back metadata about the instance.

### Conclusion

If your Kubernetes nodes have cloud IAM permissions via instance principals/profiles, you should block pods from accessing the metadata service at `169.254.169.254`. NetworkPolicies are the cleanest way to do this. Start with a default-deny policy, then explicitly allow only the egress your pods actually need while carving out the metadata IP. This prevents compromised containers from stealing node-level cloud credentials.

My full network policy configuration is in my [Kubernetes infrastructure repository](https://github.com/dylanmtaylor/dylanmtaylor-kubernetes).
