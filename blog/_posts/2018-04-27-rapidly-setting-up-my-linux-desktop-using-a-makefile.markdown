---
layout: post
title: Rapidly Setting Up My Linux Desktop Using a Makefile
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-04-27T18:49:22-04:00'
---

I'll admit it, I'm obsessed with being an early adopter of technology and I switch between Linux distributions frequently. Before Ubuntu 18.04 came out (it was just released on April 26th), I decided to test it out around the end of March, just a month before it's official release date. There's just one issue with that: it wasn't the final version. Breakage can often happen when testing out a pre-release Linux distibution. For instance, a simply `sudo apt update; sudo apt full-upgrade` can cripple a system with a bad package, resulting in a reinstall. I stumbled upon a [Makefile by Julius Beckmann](https://gist.github.com/h4cc/c54d3944cb555f32ffdf25a5fa1f2602#file-makefile) that can be run on a new Ubuntu system and immediately saw the benefit of such an approach. I can reinstall as many times as I like, and so long as I set up the commands correctly, I can have a system configured exactly how I like it within an hour. I can even run a specific make target on its own in order to install a certain set of programs or updates without rerunning the whole script. I decided to fork it, creating [my own Ubuntu Makefile repository](https://github.com/dylanmtaylor/dylan-ubuntu-makefile), adding many packages, and removing things I do not need.

I approached this as a development project at first, running Ubuntu 18.04 daily images in [VirtualBox](https://www.virtualbox.org/). VirtualBox is free and it has a very nice feature called snapshots. I would take a snapshot of a running virtual machine, test out the project, check the final state, and revert to the snapshot before it was applied, so that I could make corrections. After a few days of testing, I was ready to install this on real hardware. I backed up my desktop's home directory, and installed the 18.04 daily build. As I add packages or software to my system, I make changes to the Makefile if I want that software to be reinstalled when I rebuild my system. Now, I don't have to worry about wiping and reloading, and it is a huge timesaver. It also allows me to keep the software between my laptop and my desktop relatively in-sync since I can recreate the steps taken perfectly. Now, when I have to reinstall for whatever reason, the only data I have to worry about backing up is the `/home/` directory.


To take this one step further, as I love to test out newer versions than provided in the Ubuntu repositories, I am actually using Flatpak, Snap, PPAs, and some Git repositories to provide software. I'm actually removing the versions of things like LibreOffice and installing the flatpak version instead. As such, I need to check for Flatpak and snap platform updates in order to fully update my machine. Inspired by the `zypper dup` command on OpenSUSE, I created an alias called `dup`, which can easily update everything, including Flatpaks and snaps:

`alias dup="sudo apt clean all; sudo apt update; sudo apt -y full-upgrade; sudo flatpak update; sudo snap refresh; sudo apt autoremove"`

I've created [a gist of the common aliases that I use](https://gist.github.com/dylanmtaylor/e4176e339e0e1f4c07e5b807cfa9ed9d). I then added this alias to my `~/.bash_aliases file` By simply typing `dup` into a terminal, I can now get a fully updated system with many bleeding edge packages.
