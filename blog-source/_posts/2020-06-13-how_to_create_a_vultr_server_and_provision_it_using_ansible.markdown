---
layout: post
title: How to Create a Vultr Server and Provision it Using Ansible
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2020-06-13T21:05:54-04:00'
---
One of the aspects of infrastructure provisioning I haven't blogged about much is the actual server deployment. Professionally I have used a couple of tools for this, namely UrbanCode Deploy and Terraform, but Ansible is actually quite capable in its own regard. It allows you to provision servers on various different cloud platforms and then use the add_host task to add it to a server group and then continue on with the VM configuration steps. Because I've got a really good deal with HostHatch, I've been using them as my hosting provider for dylanmtaylor.com, but in the past, my site has been hosted on Vultr. Because Vultr is a much larger and more well-known hosting provider, similar to Digital Ocean, API integrations for Ansible and Terraform exist. 

At first, I was going to use Terraform to mess around with Vultr APIs (which would have been pretty straight-forward for me as I use Terraform with OpenStack extensively at work), but I decided that since I already had my whole site written as an Ansible playbook, I'd like to see how it works using just Ansible. Note that you need to enable the Vultr API and set the `VULTR_API_KEY` environment variable before being able to use this functionality. In the future, if I do even switch back to Vultr from HostHatch, I'll experiment with using Ansible to [configure CloudFlare DNS records for me](https://docs.ansible.com/ansible/latest/modules/cloudflare_dns_module.html) so that I don't have to manage that when I do a redeployment. The module for that actually looks very good, and it'd just be a matter of setting 5 or 6 A records.

Anyways, not using this now aside, it's still fun to play with, and since Vultr bills hourly, only costs me a few cents to run. So, without further ado, here's what the code for deploying my site looks like:

```
---
- hosts: localhost
  connection: local
  gather_facts: false

  tasks:
    - name: Ensure Vultr server exists
      local_action:
        module: vultr_server
        name: "dylanmtaylor.com"
        os: Ubuntu 20.04 x64
        plan: 1024 MB RAM,25 GB SSD,1.00 TB BW
        region: Atlanta
        state: started
        ipv6_enabled: yes
        notify_activate: yes
        private_network_enabled: yes
        ssh_keys: "Dylan M Taylor"
        auto_backup_enabled: no
      register: dylan_server

    - name: Add newly provisioned server to hosts group
      add_host:
        name: "{{ dylan_server.vultr_server.v4_main_ip }}"
        groups: "servers"

- hosts: servers
  remote_user: root
  gather_facts: no

  vars:
    ansible_python_interpreter: /usr/bin/python3

  roles:
    - users
    - nginx
    - gitcheckout
    - docker
    - cronjobs
    - utilities
    - security
    - gui
    - cleanup
```

This can be run using `ansible-playbook playbook.yml` as usual. The interesting bit here is the the `servers` host group actually needs to start out empty. In my current deployment method, I start out with the servers like populated with the IP address of the server I have sitting out there ready for provisioning. Then the roles are executed against the server in the host group. 

In the deployment model I just built, Ansible's idempotence is leveraged. It will only create a server on Vultr if one does not exist, so if for instance I wanted a different instance flavor or the server was broken/compromised, I could delete it and it'd build me a new one. There is an API for uploading an SSH key, but since there's only one of me and I have a specific public key I want, I added that via the Vultr dashboard manually and just put in the key name.

The way Ansible handles return values here is via the register key in the yaml file. By doing `register: dylan_server`, I can use the [return values provided by the vultr_server module](https://docs.ansible.com/ansible/latest/modules/vultr_server_module.html#return-values) in my further tasks. I use `add_host` to put the server in the previously empty `servers` group. From there, it's just a matter of running the roles against the server as usual. 

Unlike Terraform, which needs a state file stored somewhere, this is much easier as well, as the first task handles the issue of discovering if the server exists. I tried it and I was able to run this several times in a row and it did not recreate the server, which would cost me money.

This code can easily be modified to deploy whatever you need to a Vultr server using Ansible, and the same concepts apply to Digital Ocean, AWS, Google Cloud, SoftLayer or Azure as well.