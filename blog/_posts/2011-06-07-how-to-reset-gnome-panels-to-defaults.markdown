---
layout: post
status: publish
published: true
title: How to Reset GNOME Panels to Defaults
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 1040
wordpress_url: http://dylanmtaylor.com/?p=1040
date: '2011-06-07 16:40:13 +0000'
date_gmt: '2011-06-07 16:40:13 +0000'
---
<p>Recently, I encountered <a href="http:&#47;&#47;dylanmtaylor.com&#47;?attachment_id=1041">an unusual graphics corruption bug in my lower<span class="zem_slink"><&#47;span> GNOME panel<&#47;a>. The panel still worked perfectly fine, but it was covered in unusual corruption artefacts, and it looked unsightly. I don't think many people will actually have this problem, but it was an incredibly simple and easy fix, so I decided to share it on my blog. This may also be useful if you manage to mess up your panel layout, and you just want to start from a fresh slate. The fix is simple: just delete the directory where your <a title="GNOME Panel" rel="homepage" href="http:&#47;&#47;developer.gnome.org&#47;arch&#47;gnome&#47;corecomponents&#47;panel&#47;">GNOME panel<&#47;a> <a class="zem_slink" title="Configuration file" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Configuration_file">configuration files<&#47;a> are stored, and <a class="zem_slink" title="GNOME" rel="homepage" href="http:&#47;&#47;www.gnome.org&#47;">GNOME<&#47;a> will automatically create a new configuration folder using the default settings the next time you login. The quickest way to do this (in my opinion) is through the terminal. Simply open up a terminal, and paste in the following command:</p>
<blockquote><p>rm -rfv $HOME&#47;.gconf&#47;apps&#47;panel<&#47;blockquote><br />
Now log out and log back in. Your GNOME panel settings will be reset to their defaults. Enjoy! :)</p>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="border: medium none; float: right;" src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;06&#47;pixy16.gif" alt="" &#47;><&#47;div></p>
