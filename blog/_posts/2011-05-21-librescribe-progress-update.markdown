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
<p>Since my last post, I have made a lot of progress with LibreScribe. Just a few commits ago, LibreScribe gained the ability to retrieve a list of installed applications on the device, and add them to the list in the applications tab. I also fixed several other significant issues, including:</p>
<ul>
<li>When the smartpen is connected/disconnected, the application no longer crashes, and the status is automatically refreshed</li>
<li>Device storage usage is now displayed in <a class="zem_slink" href="http://en.wikipedia.org/wiki/Mebibyte" title="Mebibyte" rel="wikipedia">MiB</a> instead of in bytes. This makes it a lot less confusing how much space is remaining on your smartpen.</li>
<li>A bug, where the <a class="zem_slink" href="http://www.livescribe.com/" title="Livescribe" rel="homepage">Echo Smartpen</a> was detected as an "unknown <a class="zem_slink" href="http://www.livescribe.com" title="Livescribe " rel="homepage">LiveScribe</a> Smartpen" in certain cases was fixed.</li>
<li><em>All </em>absolute paths have been removed from the project. All resources are now referenced using relative paths.</li>
<li>wxFormBuilder has been replaced with wxSmith. The entire <a class="zem_slink" href="http://en.wikipedia.org/wiki/User_interface" title="User interface" rel="wikipedia">user interface</a> has been recreated from scratch (although it's very similar to the old interface, intentionally)</li>
<li>Many C++ source and <a class="zem_slink" href="http://en.wikipedia.org/wiki/Header_file" title="Header file" rel="wikipedia">header files</a> are no longer necessary, so they have been removed, and merged into other files. This makes the codebase a lot more maintainable.</li>
<li>Duplicate <a class="zem_slink" href="http://www.kernel.org/pub/linux/utils/kernel/hotplug/udev.html" title="Udev" rel="homepage">udev</a> events (such as multiple add events of the same device) are ignored now. Previously, we ended up refreshing the device information up to four times in a row because of duplicate events. This significantly reduces the delay between plugging in a device and seeing a response on the screen.</li>
</ul>
<p>There are still tons of issues that still need to be fixed before LibreScribe becomes usable in a production environment, but I've been steadily making progress, and I hope to have something useful out soon.<br _mce_bogus="1"/></p>
<div style="margin-top: 10px; height: 15px;" class="zemanta-pixie"><img style="border: medium none; float: right;" class="zemanta-pixie-img" alt="" src="http://dylanmtaylor.com/wp-content/uploads/2011/06/pixy14.gif"/></div>
