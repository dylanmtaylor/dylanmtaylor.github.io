---
layout: post
status: publish
published: true
title: LibreScribe Progress Update
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 1031
wordpress_url: http://dylanmtaylor.com/?p=1031
date: '2011-05-21 06:59:38 +0000'
date_gmt: '2011-05-21 06:59:38 +0000'
---
<p>Since my last post, I have made a lot of progress with LibreScribe. Just a few commits ago, LibreScribe gained the ability to retrieve a list of installed applications on the device, and add them to the list in the applications tab. I also fixed several other significant issues, including:<&#47;p>
<ul>
<li>When the smartpen is connected&#47;disconnected, the application no longer crashes, and the status is automatically refreshed<&#47;li>
<li>Device storage usage is now displayed in <a class="zem_slink" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Mebibyte" title="Mebibyte" rel="wikipedia">MiB<&#47;a> instead of in bytes. This makes it a lot less confusing how much space is remaining on your smartpen.<br &#47;><&#47;li>
<li>A bug, where the <a class="zem_slink" href="http:&#47;&#47;www.livescribe.com&#47;" title="Livescribe" rel="homepage">Echo Smartpen<&#47;a> was detected as an "unknown <a class="zem_slink" href="http:&#47;&#47;www.livescribe.com" title="Livescribe " rel="homepage">LiveScribe<&#47;a> Smartpen" in certain cases was fixed.<&#47;li>
<li><em>All <&#47;em>absolute paths have been removed from the project. All resources are now referenced using relative paths.<&#47;li>
<li>wxFormBuilder has been replaced with wxSmith. The entire <a class="zem_slink" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;User_interface" title="User interface" rel="wikipedia">user interface<&#47;a> has been recreated from scratch (although it's very similar to the old interface, intentionally)<&#47;li>
<li>Many C++ source and <a class="zem_slink" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Header_file" title="Header file" rel="wikipedia">header files<&#47;a> are no longer necessary, so they have been removed, and merged into other files. This makes the codebase a lot more maintainable.<&#47;li>
<li>Duplicate <a class="zem_slink" href="http:&#47;&#47;www.kernel.org&#47;pub&#47;linux&#47;utils&#47;kernel&#47;hotplug&#47;udev.html" title="Udev" rel="homepage">udev<&#47;a> events (such as multiple add events of the same device) are ignored now. Previously, we ended up refreshing the device information up to four times in a row because of duplicate events. This significantly reduces the delay between plugging in a device and seeing a response on the screen.<&#47;li><&#47;ul>
<p>There are still tons of issues that still need to be fixed before LibreScribe becomes usable in a production environment, but I've been steadily making progress, and I hope to have something useful out soon.<br _mce_bogus="1"&#47;><&#47;p></p>
<div style="margin-top: 10px; height: 15px;" class="zemanta-pixie"><img style="border: medium none; float: right;" class="zemanta-pixie-img" alt="" src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;06&#47;pixy14.gif"&#47;><&#47;div></p>
