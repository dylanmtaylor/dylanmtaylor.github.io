---
layout: post
status: publish
published: true
title: Huge Clippy Redesign in Progress
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
date: '2010-08-06 22:23:45 +0000'
date_gmt: '2010-08-06 22:23:45 +0000'
---
<p>I've been working non-stop on redesigning the Clippy interface, and it's coming out very nice. However, in order to take full advantage of the service I'm implementing, I need to make some major fundamental changes of how Clippy works, in particular, how it accesses the <a title="Android ClipboardManager" href="http://developer.android.com/reference/android/text/ClipboardManager.html">ClipboardManager</a>, and how it reads from and writes to the clippings database. I'm planning on starting the service as soon as the application is opened, and having these basic tasks handled by the service, rather than having redundant code in each of my classes. Here's how this is going to work:</p>
<ul>
<li>The service will always run while Clippy is open, even if monitoring the <a class="zem_slink" title="Clipboard (software)" rel="wikipedia" href="http://en.wikipedia.org/wiki/Clipboard_%28software%29">clipboard</a> is disabled.</li>
<li>While the Clippy interface is open, and in focus the service will not monitor the clipboard even if that feature is enabled.</li>
<li>If clipboard monitoring is disabled, the service will close when Clippy is exited. Otherwise, when Clippy is closed, the service will start monitoring the clipboard</li>
<li>The service will handle every single request for Clippy to read from or write to the clipboard or the database</li>
</ul>
<p>Also, I've been busier than usual lately, so expect there to be a bit of a delay between Clippy releases. Hopefully, I can get a version with the new, much better looking interface in the market soon.</p>
