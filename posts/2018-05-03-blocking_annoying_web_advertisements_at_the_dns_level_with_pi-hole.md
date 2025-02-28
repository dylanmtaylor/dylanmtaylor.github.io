---
layout: post
title: Blocking Annoying Web Advertisements at the DNS Level with Pi-Hole
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-05-03T18:39:19-04:00'
---

![Pi-Hole](/images/blog/2018/05/Vortex-R.png)

If you're like myself and many other users on the internet, you probably hate advertisements. Not only are they annoying with automatically playing videos, covering up web content and being a vector for malware transmission from unscrupulous advertisement platform, but they can drain your battern on your phone and eat up your bandwidth if you are on a fixed data plan.

There are many reasons to hate advertisements but fortunately users are fighting back. One way is through browser extensions. I personally use a free and open source one called [uBlock Origin](https://github.com/gorhill/uBlock) on all of my devices. It is independently operated, lightweight and does not support the acceptable ads program, unlike Adblok Plus, which is partially funded by advertisers paying to get unblocked. See the conflict of interest here?

While these extensions are fantastic, they're only a start. Unfortunately, at least in mobile applications like the one from [Weather Underground](https://www.wunderground.com/), which is quite a good app by the way, there is no way to block advertisements without paying a fee to the developer. The mobile version of Chrome also does not support extensions. I've lot count of the number of times I've seen fake "Your Android has been infected" pages that make noises and vibrate the phone. It's obnoxious. Until this isn't the case anymore, browsing the mobile web without an adblocker is a chore.

So, how can we block ads across all the devices in the network, including phones without installing special software on anything? Simple: by running our own DNS server. DNS, short for Domain Name System, is a technology that handles domain lookups. When you type dylanmtaylor.com into your browser, your browser doesn't know where to go to make a connection from the name. It contacts a DNS server to translate the humanly readable domain name into an IP address, which your browser then uses to make the connection. If we intentionally override this using our own DNS server, we can point adomain to something else, like the DNS server itself or 127.0.0.1. By doing this, the domain is effectively blocked.

This is the core concept behind [Pi-Hole](https://pi-hole.net/). With nothing more than a cheap [Raspberry Pi](https://www.raspberrypi.org/) single board computer, you can run your own DNS server. The setup is simple and described on the [Pi-Hole](https://pi-hole.net/) website. Simply connect your Pi to the network, setup static IP address allocation for the Pi's MAC address in your router's admin interfeace, install the software (probably on top of [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/)), and finally reconfigure the DNS server entries of your router to point to the local Pi-Hole server. By doing this, so long as you are connected to your wireless network, you will be exposed to significantly less advertisements unless you manually configure your devices to use an alternative DNS server such as 1.1.1.1 from CloudFlare. If you enjoy Pi-Hole, I'd like to suggest [donating a few dollars to them](https://pi-hole.net/donate/). The project is maintained entirely by volunteers and could use all the help they can get to fund the development.