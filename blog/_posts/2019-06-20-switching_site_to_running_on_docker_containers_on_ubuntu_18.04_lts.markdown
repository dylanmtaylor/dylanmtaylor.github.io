---
layout: post
title: Switching to Docker containers on Ubuntu 18.04 LTS
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2019-06-20T19:35:06-04:00'
---

I haven't posted in a while, but I plan on spending more time working on the site in the near future. I've been busy with work and life stuff, so I neglected this blog a bit. Recently though, I decided to revisit this site and try to modernize it a bit and take advantage of some of the DevOps skills I've learned professionally, namely via switching to Docker containers. Containers run the same no matter what OS they are on, and the versions can be pinned to avoid things breaking with system updates (rare, but it did happen when I was running on the OS directly). They also provide a better degree of security, passing in the contents of the website as a volume mount and using environment variables to provide configuration. Even if there was an Nginx or PHP vulnerability, it mitigates the risk to the host. I came across a wonderful Docker container by Ric Harvey, [nginx-php-fpm](https://gitlab.com/ric_harvey/nginx-php-fpm/), and I've got to say, it's really nice. Since I track the contents of subdomains in git repositories, the ability to have Docker do a pull of the contents is amazing, and I can still use cronjobs to do updates by doing a git pull in the container itself. I just completed the first part of a nearly complete rewrite of the Ansible playbook that deploys the site, and wiped and reloaded the virtual machine hosting it. I've got to say, it's proving to be a very good solution so far.
