---
layout: post
status: publish
published: true
title: Upgraded Hosting to Virtual Private Server
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2014-06-21 06:49:49 +0000'
date_gmt: '2014-06-21 06:49:49 +0000'
---
<p>Unfortunately, DreamHost was killing my processes because my site was using too much memory and my site would occasionally go offline. Despite being a great hosting company with a great control panel, DreamHost was no longer meeting my needs. I decided I needed several things: more control, more resources and affordable pricing. As a software developer used to SSH and the Linux terminal, it made sense to switch to a reliable VPS service. As of now, this site is now hosted on an unmanaged SSD VPS and the performance increase has been phenomenal. According to the tests that I ran before and after migration, site load time has decreased from around 1.5 seconds to around 1/30th of a second (on average). If I migrate from Apache to nginx as I'm currently planning to, it's entirely possible that the load time will be even lower on average and more consistent. In addition to the load time being faster and having access to guaranteed resources through KVM (which is resilient to overselling), the amount of bandwidth I have is insane as this site is hosted on a 1Gbps dedicated link with 1 IPV4 address and a /64 IPV6 block. Of course, this means that I have to handle all of my software configuration and maintenance myself, but I enjoy that, so it's not so bad. Ubuntu 14.04 LTS is pretty good in terms of ease of use, and I am very familiar with configuring it already, so that's not a problem at all. Overall, expect much better performance from this site, and stay tuned for more updates.</p>
<p><img class="alignnone" src="http://www.speedtest.net/result/3576780410.png" alt="764.17 Mb/s down, 211.08Mb/s up 12ms ping" width="300" height="135" /></p>
