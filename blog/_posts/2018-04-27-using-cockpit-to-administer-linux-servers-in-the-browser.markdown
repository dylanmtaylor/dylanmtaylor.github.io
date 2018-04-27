---
layout: post
title: Using Cockpit to Administer Linux Servers in the Browser
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-04-27T18:25:40-04:00'
---

It's often really nice to be able to log into a web interface and check the status of your server and run a few terminal commands. Previously for this, I was using the [Ajenti Server Admin Panel](http://ajenti.org/), but I recently discovered a new solution that I like better because of its simplicity and sponsorship by Red Hat. That solution is the [Cockpit project](http://cockpit-project.org/). As described on the official website, "Cockpit is a server manager that makes it easy to administer your GNU/Linux servers via a web browser." I decided to give it a try. Since my server is running CentOS 7, this was very easy to get up and running, and it is actually included by default in the CentOS repositories as the `cockpit` package. This is a great addition to tools like `glances` and `htop`, and makes checking on the server a breeze.

Installing the base package, enabling it, and setting the firewall rules as described on the official website gets you a functional web UI, with things like the ability to login to a terminal session without using SSH, but it's a bit limited in the default installation. I quickly discovered that cockpit is extendable by modules, and added some additional packages to get more functionality, including:

* cockpit-storaged
* cockpit-networkmanager
* cockpit-packagekit
* cockpit-selinux
* cockpit-pcp
* cockpit-sosreport
* cockpit-docker

Once all these packages are installed, I was really satisfied with the end result, so I added this to the Ansible script for the site. Now every time I reinstall, I get cockpit without having to do any additional work. The interface allows me to check things like CPU, RAM, network, and disk utilization, at a glance, and with a single click, I can spawn a terminal interface within the cockpit dashboard. It's also fantastic for managing [Docker containers](https://www.docker.com/). If you're an administrator and want a neat way to control your servers, I'd recommend checking it out.