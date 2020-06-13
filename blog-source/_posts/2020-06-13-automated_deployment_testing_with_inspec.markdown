---
layout: post
title: Automated Deployment Testing With Chef InSpec
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2020-06-13T14:38:53-04:00'
---

<a href="https://www.inspec.io/"><img src="/images/blog/2020/06/inspec.png" width="50%" style="float:left" /></a>A good practice for any automated build system is integration testing. Chef InSpec provides a way to handle integration testing by checking properties of resources and comparing the actual value to a declared "correct" value. By doing so, after a deployment is complete, it can run through a suite of tests and validate that everything is the way that it should be. There are numerous resource types that InSpec supports and I've used professionally, such as checking if packages are installed, if a configuration file contains a certain line, or if a port is open and, for example, java is the process listening on that port. For the longest time, since this site was created, I basically loaded up the site's resources in a browser after running my Ansible playbook, and if everything looked good enough, I considered it successfully deployed. This is, after all, a pretty simple deployment. But, that said, I'd be a lousy DevOps engineer if I didn't take every opportunity to automate testing processes and reduce toil as well as catch blatant errors automatically when Ansible is run on a weekly schedule to enforce desired state.

