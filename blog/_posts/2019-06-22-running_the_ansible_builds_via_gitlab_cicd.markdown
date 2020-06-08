---
layout: post
title: Running the Ansible builds via GitLab CI/CD
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2019-06-22T12:10:32-04:00'
---

I utilize GitLab's CI/CD functionality professionally all of the time as well as Docker containers to provide pipeline functionality into our cloud environment. I decided to take some of the knowledge I learned and set up a personal GitLab account with a project to do the Ansible deployment of my website. Unfortunately, the hosting provider I'm currently using, HostHatch does not automatically provision an SSH key and has no support for provisioning APIs or custom cloud-init user data. It is very affordable (I'm on a promotional plan with 2GB of RAM and 10GB of NVMe disk for $30/year, so it's a hard-sell to switch back to Vultr or maybe AWS or DigitalOcean). As there is no API, unfortunately I can't have a fully automated deployment, but it's very close. I'd love to leverage a provider for HashiCorp terraform and have it set up a server with my SSH public key already on it using cloud-init and then use the CloudFlare DNS provider features to update the DNS record sets automatically to point to the new server, but since I'm only dealing with one "environment" and one server for that matter, it'd be massively over-kill anyways, I'd just be doing it as a fun exercise. Anyways, with the known caveat in mind that after re-imaging the VPS with the Ubuntu 18.04 template I have to manually run `ssh-copy-id 'root@[server IP address]'` from my local machine with my SSH key, the process is fully automated.

 I started by making a new GitLab repository. GitLab's shared runner service, as of the time of writing, gives you 2000 minutes a month of free builds. This is more than enough for my needs. In a GitLab project, you can create a file called `.gitlab-ci.yml` which lets you specify the jobs and stages in the pipeline as well as the base Docker image that your build will run in. In my case, I chose Ubuntu 18.04 as it matches what's running the server itself right now (recently switched from CentOS 7). This is tracked in the dylanmtaylor-ansible repository, which was recently moved from GitHub to GitLab.

 As I can't leverage Terraform via a state file to track my resources, and use the outputs to discover the IP of the server after destroying and recreating it for a build, I need to hard-code the IP address into the variables as `$IP_ADDRESS`, which is passed into the build. I can't rely on DNS as I may be deploying to a server that my DNS isn't pointing to yet, so I write that value to /etc/hosts during the build. In addition, I have the SSH private key (which I need to use Ansible to connect to the VM) in the variables as well, stored as `$PRIVATE_KEY`. GitLab CI/CD variables can be set on the page `Settings > CI/CD > Variables`, and in my case, I have these marked as "Protected".

 The code I'm using in the CI/CD file looks like this:

 ```
# This simple GitLab CI file checks out and deploys my Ansible playbook
image: ubuntu:18.04

before_script:
  - apt-get update
  - apt-get -y install software-properties-common
  - apt-add-repository --yes --update ppa:ansible/ansible
  - apt-get -y install ansible git rsync
  - mkdir ~/.ssh
  - echo "$PRIVATE_KEY" > ~/.ssh/id_rsa
  - chown -R $USER:$USER ~/.ssh
  - chmod 0600 ~/.ssh/*
  - chmod 0700 ~/.ssh/
  - echo "$IP_ADDRESS dylanmtaylor" >> /etc/hosts 

ansible_deploy:
  stage: deploy
  script:
    - git clone https://gitlab.com/dylanmtaylor/dylanmtaylor-ansible.git
    - cd dylanmtaylor-ansible
    - ansible-playbook playbook.yml

 ```

The `before_script` section sets up the container before each section is run. If I decide to add more steps, like a test section to make sure thing are up and running after the build, having the dependencies setup globally is a nice way to not have to repeat code. There is one stage here, called `deploy`, and it has a job, `ansible_deploy`. After the setup where I install the latest Ansible and other required packages, as well as setting up the hosts and the SSH key, I run the playbook in the deploy stage. This is actually using a separate repository so I can keep my Ansible playbook itself public, and it's just a matter of changing the directory and running Ansible.

This method works great, but I do sometimes hit an issue with unattended-upgrades running shortly after the system boots for the first time, which locks dpkg and prevents some of the installations from working, so every once in a while I have to hit retry. Because Ansible uses state to determine what actions to take, it's idempotent, so retrying won't break anything.
