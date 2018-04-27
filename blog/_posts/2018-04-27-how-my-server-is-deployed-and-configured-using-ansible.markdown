---
layout: post
title: How My Server is Deployed and Configured Using Ansible
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-04-27T19:01:59-04:00'
---

Traditionally, deploying infrastructure was a very time and labor intensive process. Manually going in and configuring services, installing packages, applying system updates, copying over data, etc. could easily take an entire day or more of man hours. In order to solve this problem, several tools, such as [Ansible](https://www.ansible.com/), [Chef](https://www.chef.io/chef/), [Puppet](https://puppet.com/), and [SaltStack](https://saltstack.com/) were created in order to make the lives of system administrators and infrastructure architects everywhere easier. I have adopted Ansible in order to configure my web server. Honestly, the way that my server is configured, there is nothing on it that I cannot afford to lose. With very little effort, I can re-run the Ansible "playbook", and an identical serer will be created within a couple hours. This is a concept called immutable infrastructure. If there is something wrong with the server, it makes more sense to simply replace it rather than reconfigure or repair it.

Think of an Ansible playbook as a "blueprint" for the server. It contains a bunch of rules that are used to validate the state of things, and take corrective action if a deviation is detected.  By default, this means that properly written Ansible playbooks are idempotent. For instance, I can write a rule that says a file contains a line, or a package is the latest version. If the criteria is already met, no action will be taken, but if not the correction will be made. Playbooks are broken down into `roles`. Roles are a set of tasks that Ansible evaluates. For instance, in order to configure sshd and firewalld, I am using a security role. For my webserver, I have an nginx role. These roles are called by the `playbook.yml` file against all the hosts in the defined group in the `hosts` file local to [my Ansible playbook repository](https://github.com/dylanmtaylor/dylanmtaylor-ansible). This playbook is made public in hopes that someone will find it useful, as well as for my own purposes. Every time I make a major change to my server, I update the playbook with more tasks to automate this change, so that I never need to do those tasks again. In order to deploy my server to a new host, I simply need to install CentOS 7 on the machine (usually via an ISO image so I can set up a 1GB swap partition), edit the hosts file on my local machine to point dylanmtaylor to the new IP address, copy my SSH public key to the server using `ssh-copy-id root@dylanmtaylor`, run `ansible-playbook playbook.yml` and wait. Then when that is done, I can login to the server via SSH or Cockpit and change the password for the users to be more secure. Once that is done, I have a new server that is fully configured and ready to serve my website.

