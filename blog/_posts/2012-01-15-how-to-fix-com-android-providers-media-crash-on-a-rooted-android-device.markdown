---
layout: post
status: publish
published: true
title: How to fix com.android.providers.media crash on a rooted Android device
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
date: '2012-01-15 20:47:46 +0000'
date_gmt: '2012-01-15 20:47:46 +0000'
---
<p>I noticed that my rooted Android phone, a Samsung Epic 4G was crashing when I opened my Camera application, saying that com.android.providers.media was force closing. It took me about half an hour, but I figured out how to fix the problem using adb. The problem is that it was having trouble writing to and reading from the media database. Deleting the media databases solves the problem without doing a complete factory reset. To do this, run adb shell, and then type su to gain root access. Now type in "rm /data/data/com.android.providers.media/databases/*" and hit enter. This will fix the problem.</p>
