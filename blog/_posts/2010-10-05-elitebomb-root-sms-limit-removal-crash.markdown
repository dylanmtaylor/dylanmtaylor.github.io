---
layout: post
status: publish
published: true
title: EliteBomb Root SMS Limit Removal Crash
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
date: '2010-10-05 21:34:53 +0000'
date_gmt: '2010-10-05 21:34:53 +0000'
---
<p>I've been receiving reports about crashes on certain <a class="zem_slink" title="Root" rel="wikipedia" href="http://en.wikipedia.org/wiki/Root">rooted</a> devices when attempting to remove the <a class="zem_slink" title="SMS" rel="wikipedia" href="http://en.wikipedia.org/wiki/SMS">SMS</a> sending limitation. I am already working on a fix, and so far, it works fine. Just a bit more testing, and I will upload it to the <a class="zem_slink" title="Android Market" rel="homepage" href="http://www.android.com/market/">Android market</a>. I'm trying to rush this fix out, but I need to make sure that it will work on as many devices as possible. Thank you for your patience! If you can't wait for a fix, the problem is caused by a lack of the "cp" command on the devices attempting to remove the limit. Adding the cp <a class="zem_slink" title="Binary file" rel="wikipedia" href="http://en.wikipedia.org/wiki/Binary_file">binary file</a> to your device is a workaround, however, a fix that will require you to make no changes at all will hopefully be released soon; almost certainly today. Also, the new version will help to reduce false positives when checking if the device is rooted or not.</p>
<p><strong>EDIT:</strong> New version [1.4] is up! If you had trouble removing the limit before, it  should work now, and if your device isn't capable of removing the limit, the message shouldn't appear anymore. Look for an update in the market! :)</p>
<p><strong>EDIT 2:</strong> A minor performance update, version 1.5 is released. Users of version 1.4 might have noticed a small (5 seconds or less) freeze while checking if your device is rooted or not, even if your device isn't rooted. This version significantly speeds up the process of checking if your device is rooted, detecting non-rooted devices almost instantaneously, and virtually removing the delay completely for those devices.</p>
