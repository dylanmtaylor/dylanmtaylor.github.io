---
date: 2018-04-27
title: How to install the Mainline Kernel on Enterprise Linux 7 the Easy Way
description: Installing a newer kernel on RHEL/CentOS systems using ELRepo to get better driver support and performance.
---
## How to install the Mainline Kernel on Enterprise Linux 7 the Easy Way

Red Hat Enterprise Linux and CentOS, which is based off of RHEL source code are known for their stability. They are supported for a very long time (10+ years), and other than backporting security fixes, very little actually changes in each point release. For various reasons, you may want to install a newer kernel than the one built by Red Hat. This could be due to better driver support, performance increases, etc. [ELRepo](https://elrepo.org/tiki/tiki-index.php) is a project that provides hardware-related packages and newer kernels that are compatible with enterprise Linux distributions. As part of building out my site and running enterprise Linux distributions on my own hardware, I install their kernel-ml package. Unfortunately, on a headless system this is a little bit painful, since GRUB likes to default to the version that was previously booted, so even after a reboot you won't see the new kernel applied. I also wanted to perform this operation in a "one line" automated fashion via Ansible, and needed to keep it simple for the sake of making it easy to do.

I found a Markdown file with steps to automatically apply the mainline kernel update from [Phil Porada](https://github.com/pgporada), and decided that it would be sufficiently nicer to have it in [a repository](https://github.com/dylanmtaylor/enterprise-linux-7-mainline-kernel-installer) so that you can run it as a shell script. If you're interested in using this (or any script for that matter) I suggest you review the source code before doing so. Never pipe anything to bash without reading the code to make sure it's safe. That said, the process is very easy. Simply run:

`curl https://raw.githubusercontent.com/dylanmtaylor/enterprise-linux-7-mainline-kernel-installer/master/mainline-kernel.sh | sudo bash`

and then reboot the server. Once back into the system, I advise you to remove the original kernel packages with this command:

`sudo yum remove kernel kernel-debug-devel`

This will ensure that the kernel-ml package is the only package in the GRUB menu entries and that it is the one used as default when a new version comes out and the update is applied.