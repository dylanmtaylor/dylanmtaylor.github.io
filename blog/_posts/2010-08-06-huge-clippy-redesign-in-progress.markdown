---
layout: post
status: publish
published: true
title: Huge Clippy Redesign in Progress
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 268
wordpress_url: http://www.dylanmtaylor.com/?p=268
date: '2010-08-06 22:23:45 +0000'
date_gmt: '2010-08-06 22:23:45 +0000'
---
<p>I've been working non-stop on redesigning the Clippy interface, and it's coming out very nice. However, in order to take full advantage of the service I'm implementing, I need to make some major fundamental changes of how Clippy works, in particular, how it accesses the <a title="Android ClipboardManager" href="http:&#47;&#47;developer.android.com&#47;reference&#47;android&#47;text&#47;ClipboardManager.html">ClipboardManager<&#47;a>, and how it reads from and writes to the clippings database. I'm planning on starting the service as soon as the application is opened, and having these basic tasks handled by the service, rather than having redundant code in each of my classes. Here's how this is going to work:</p>
<ul>
<li>The service will always run while Clippy is open, even if monitoring the <a class="zem_slink" title="Clipboard (software)" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Clipboard_%28software%29">clipboard<&#47;a> is disabled.<&#47;li>
<li>While the Clippy interface is open, and in focus the service will not monitor the clipboard even if that feature is enabled.<&#47;li>
<li>If clipboard monitoring is disabled, the service will close when Clippy is exited. Otherwise, when Clippy is closed, the service will start monitoring the clipboard<&#47;li>
<li>The service will handle every single request for Clippy to read from or write to the clipboard or the database<&#47;li><br />
<&#47;ul><br />
Also, I've been busier than usual lately, so expect there to be a bit of a delay between Clippy releases. Hopefully, I can get a version with the new, much better looking interface in the market soon.</p>
