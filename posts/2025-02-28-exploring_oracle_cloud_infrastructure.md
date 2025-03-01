---
date: '2025-02-28'
title: Exploring Oracle Cloud Infrastructure
description: Playing around with the surprisingly generous free tier offerings of Oracle Cloud as an AWS professional and building a robust infrastructure at zero cost
---
## Exploring Oracle Cloud Infrastructure

If you know me and have heard my opinions on Oracle, particularly around their licensing and behavior in the open source community, you'd be surprised to hear that I've been playing around with Oracle Cloud. Believe it or not, it's a pretty solid offering, and their "always free" resources are extremely generous. Professionally, I work as a cloud engineer in AWS. I have exposure to a large number of their services, and am constantly writing and refactoring Terraform (now OpenTofu) code, and deploying it using Scalr.

So, if I'm so experienced with AWS, why would I build my own site on Oracle Cloud? The resources that I have deployed in Oracle right now would easily be several hundred dollars per month in Amazon. I also have now gained experience with the majority of the major services on Oracle Cloud, as it is much simpler than other major cloud providers. Let's consider look at some of the stuff I've got deployed via [my Terraform configuration](https://gitlab.com/dylanmtaylor/terraform-dylanmtaylor-com), for an approximate cost of $0:

* 2x ARM instances with 2 vCPUs and 12 GiB RAM and 2x AMD instanes with 1vCPU and 1 GiB RAM. Each has 50 GiB of block storage.
    - All services are architecture independent and run on either x86_64 or ARM. I am heavily utilizing cloudinit, container images, Docker compose, and systemd unit files to orchestrate services.
    - Each has a reserved public IPv4 address behind a network security group which only allows direct external internet ingress from my personal IP address.
* An application load balancer with public IPv4 address, using all 4 servers as a backend set.
    - Capped at 10 Mbps to keep costs down, as that is what is included in the free tier.
* Object storage buckets with customer managed keys. 20GB of bucket storage is included at no charge.
    - The public one is FUSE mounted to all servers to serve content from the bucket at files.dylanmtaylor.com.
    - Example: https://files.dylanmtaylor.com/dylan-resume.pdf
* A "HeatWave" MySQL database with 1 core, 8 GiB of RAM and 50 GiB of storage.
* A private certificate authority, which generates self-signed certificates for my load balancer and an Oracle HeatWave (MySQL) database.
* A vault for secrets. This works almost identically to AWS secrets manager.
* Multiple customer-managed KMS keys. I have one each for public/private file buckets, as well as block volumes, secrets, and my certificate authority.
* Email delivery for alerts and notifications enabled on Oracle's email delivery service. This is the equivalent of SES in Amazon.
    - The DKIM record is automatically created in Cloudflare using resource attributes from the OCI resources.
* Public and private subnets with network security lists and rules, controlling ingress/egress to my instances at a network level.
* "Stacks", which is a minimal version of Terraform Cloud. I stopped using this in favor of Scalr, however, as Scalr is just so much better.
* Bastions - these allow network access to the private subnet to a specific target on a specific port for three hour sessions. No charge.

* Cloud shell - I can run commands from a shell within my Virtual Cloud Network from my browser without being on an instance for no charge. Other clouds also offer this.
* So much monitoring and logging it's not even funny.
    - There are "plugins" for Oracle Linux you can toggle on with a single click (or API call via Terraform in my case), and you get a dashboard showing historical utilization
    - Access and error logs for my load balancer, stored in log groups, similar to Cloudwatch in Amazon.
    - Audit trails of all emails sent via the email delivery service
* Cloud Guard - this is like Amazon's security hub. It support detectors and responders and even performs scans within the instances for known CVEs for free at the standard tier. There is an enterprise tier as well, but I don't know what that one offers.
* IAM policies. Honestly, this one is kind of a miss compared to AWS's IAM. It's much more difficult to discover how to correctly write these.

Honestly, this is exteremely close to production-ready architecture with logging, monitoring, alerting, redundancy, etc. and they offer that for free. It was fun to wire all of this up and try out these services, and I learned a ton about Oracle Cloud while doing so. While it's not as supported or documented, I was shocked at what I could build without paying anything at all, and it's more than most small businesses use. If you're looking for a place to host a small project, I'd give Oracle Cloud a shot. You might be surprised at how good it is. I certainly was.

[![Screenshot of Oracle Linux 9 ARM instance's neofecth output in OCI](/images/blog/2025/02/oci_instance_neofetch.png)]