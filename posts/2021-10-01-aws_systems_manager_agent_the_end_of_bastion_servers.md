---
date: 2021-10-01
title: AWS Systems Manager Agent - The End of Bastion Servers?
description: Learn how AWS Systems Manager Agent eliminates the need for bastion servers by providing secure access to EC2 instances without exposing SSH or RDP ports.
---
## AWS Systems Manager Agent - The End of Bastion Servers?

In almost every role I've ever worked, in some fashion or another, there was always a server you needed to access that didn't have SSH or RDP directly exposed to the internet. Typically, this worked by having a small, lightweight "bastion" or "jump box" instance deployed that you'd connect to directly, and then from there you'd be able to connect to the instance. With AWS though, this is completely unnecessary now. Not only is the bastion server not a requirement, but the security group for the instance doesn't need to allow ingress to the SSH or RDP ports at all, as long as the SSM agent is installed. This is default on Amazon Linux 2 images and recent Ubuntu server images. 

I created an example project demonstrating how to create a deployment that works with SSM using Terraform here: https://gitlab.com/dylanmtaylor/aws-terraform-ec2-ssm

As a pre-requisite, you'll need the AWS CLI and the session manager plugin installed. On Arch Linux, these are the `aws-cli` and `aws-session-manager-plugin` packages.

There is a nice SSH configuration that you can use to be able to connect to the instance using SSM that Amazon provides:

```
host i-* mi-*
  ProxyCommand sh -c "aws ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p'"
```

With this, you can simply type `ssh i-[instance id]`, and you will be connected. You don't need the configuration though, as you can just run:

```
aws ssm start-session --target i-[instance id]
```

This will establish an SSH session as well.

But, more interestingly, you can forward pretty much any port to a local port on the system, which means that you can connect to RDP as well, using this trick (in this case, it's for RDP):

```
 aws ssm start-session --target i-[instance id] --document-name AWS-StartPortForwardingSession --parameters "localPortNumber=3389,portNumber=3389"
 ```

 After running that, it'll wait for a connection and start forwarding it seamlessly. I was able to connect to localhost:3389 using Remmina and connect to the RDP session on the remote system.

 This really simplifies system management and increases the security of your deployment as there is no longer any need to expose ports, as long as you're able to authenticate with AWS itself using API keys.
