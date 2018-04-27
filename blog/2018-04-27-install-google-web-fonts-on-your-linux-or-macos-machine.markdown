---
layout: post
title: Install Google Web Fonts on your Linux or macOS Machine
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-04-27T18:16:25-04:00'
---

Google provides a very nice collection of fonts called [Google Fonts](https://fonts.google.com/), with [a repository on GitHub](https://github.com/google/fonts). While looking for fonts to use for personal document creation, I stumbled upon a project called [Web-Font-Load by Quinton Pike](https://github.com/qrpike/Web-Font-Load). I decided to test it out, and it easily installed the collection on my machine. I noticed though that the project had several install/uninstall files that were platform specific. I ended up rewriting the installation script to be common to multiple Linux distributions as well as macOS and committing the changes via [a pull request to the upstream repository](https://github.com/qrpike/Web-Font-Load/pull/22). After the changes that I made, it is now possible to simply run a single command, regardless of your platform, and the fonts will be installed:

`curl https://raw.githubusercontent.com/qrpike/Web-Font-Load/master/install.sh | bash`

This is a very nice collection of over 1500 quality fonts from Google and other contributors, and there are many different styles. It includes fonts you'll see in things like Google Docs. After running the script, you may need to reboot your system for the fonts to be picked up.