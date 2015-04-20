---
layout: post
status: publish
published: true
title: Minor Clippy Regressions
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 293
wordpress_url: http://www.dylanmtaylor.com/?p=293
date: '2010-08-15 20:14:10 +0000'
date_gmt: '2010-08-15 20:14:10 +0000'
---
<p>I'm currently postponing the release of Clippy due to several small, but significant regressions that I am experiencing. I want to ensure that those of you who have downloaded and used a previous version of Clippy, such as the current version in the market feel comfortable using the new version that I am about to release. Because of some significant changes in the way I have Clippy written, such as using of <a class="zem_slink" title="XML" rel="wikipedia" href="http://en.wikipedia.org/wiki/XML">XML</a>-based menu resources instead of generating the menus using <a class="zem_slink" title="Source code" rel="wikipedia" href="http://en.wikipedia.org/wiki/Source_code">source code</a> when the application runs, I have run into several problems that I am looking into. Rest assured, I will be releasing a new version of Clippy soon. However, at the moment, there are several regressions such as this one:</p>
<ul>
<li>When there is no text in the text editor, the "Save", "Edit", and "Clear" buttons are no longer disabled. This worked perfectly while I was using menus generated using code, as I could set whether or not the menu items are enabled, however, when I switched to XML-based menus, attempting to set any attributes of the menu items results in the entire application crashing with a NullPointerException.</li>
</ul>
<p>Once I get most of the regressions fixed, I will release an update of the code on the market.</p>
<p><strong>UPDATE:</strong> I figured out how to set whether or not the MenuItems were enabled or not. Instead of using the findViewByID() method, I had to use menu.findItem().</p>
<p><strong>UPDATE 2:</strong> Email sending now works properly, and I added a send button to the <a class="zem_slink" title="Context menu" rel="wikipedia" href="http://en.wikipedia.org/wiki/Context_menu">context menu</a> of the "Current" tab.</p>
