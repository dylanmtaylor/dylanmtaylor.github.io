---
layout: post
status: publish
published: false
title: How to Reset GNOME Panels to Defaults
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2011-06-07 16:40:13 +0000'
date_gmt: '2011-06-07 16:40:13 +0000'
---
<p>Recently, I encountered <a href="http://dylanmtaylor.com/?attachment_id=1041">an unusual graphics corruption bug in my lower<span class="zem_slink"></span> GNOME panel</a>. The panel still worked perfectly fine, but it was covered in unusual corruption artefacts, and it looked unsightly. I don't think many people will actually have this problem, but it was an incredibly simple and easy fix, so I decided to share it on my blog. This may also be useful if you manage to mess up your panel layout, and you just want to start from a fresh slate. The fix is simple: just delete the directory where your <a title="GNOME Panel" rel="homepage" href="http://developer.gnome.org/arch/gnome/corecomponents/panel/">GNOME panel</a> <a class="zem_slink" title="Configuration file" rel="wikipedia" href="http://en.wikipedia.org/wiki/Configuration_file">configuration files</a> are stored, and <a class="zem_slink" title="GNOME" rel="homepage" href="http://www.gnome.org/">GNOME</a> will automatically create a new configuration folder using the default settings the next time you login. The quickest way to do this (in my opinion) is through the terminal. Simply open up a terminal, and paste in the following command:</p>
<blockquote><p>rm -rfv $HOME/.gconf/apps/panel</p></blockquote>
<p>Now log out and log back in. Your GNOME panel settings will be reset to their defaults. Enjoy! :)</p>
