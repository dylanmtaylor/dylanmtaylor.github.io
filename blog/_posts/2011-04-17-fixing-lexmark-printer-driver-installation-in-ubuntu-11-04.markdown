---
layout: post
status: publish
published: true
title: Fixing Lexmark Printer Driver Installation in Ubuntu 11.04
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 1027
wordpress_url: http://dylanmtaylor.com/?p=1027
date: '2011-04-17 18:20:55 +0000'
date_gmt: '2011-04-17 18:20:55 +0000'
---
<p>Recently I just installed the <a class="zem_slink" title="Lexmark" rel="homepage" href="http:&#47;&#47;www.lexmark.com&#47;">Lexmark<&#47;a> <a class="zem_slink" title="Printer driver" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Printer_driver">printer driver<&#47;a> in my 64-bit <a class="zem_slink" title="List of Ubuntu releases" rel="homepage" href="http:&#47;&#47;www.ubuntu.com&#47;">Ubuntu 11.04<&#47;a> installation. As you may or may not notice, the installer is broken by default in Ubuntu 11.04, and it just exits with an error message, saying</p>
<blockquote><p><a class="zem_slink" title="Lua (programming language)" rel="homepage" href="http:&#47;&#47;www.lua.org">Lua<&#47;a> error detected: While parsing install.lua: config&#47;run.lua:1374: attempt to index global 'ownhership' (a nil value)<&#47;blockquote><br />
After playing with the installer, I finally got it to work <em>perfectly<&#47;em>, so I emailed the Lexmark support team to let them know how to fix this, but for now, I'm going to share what you need to do on my blog.</p>
<p>First, you need to extract the files for the installer. To do this, you need to run</p>
<blockquote><p>.&#47;lexmark-inkjet-legacy-wJRE-1.0-1.amd64.deb.sh --noexec --keep<&#47;blockquote><br />
It's worth noting that there are two hyphens before noexec and keep. Once you run that command, the files for the installer will be extracted to the tmp folder in the <a class="zem_slink" title="Working directory" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Working_directory">current working directory<&#47;a>. For now, just type <strong>cd tmp<&#47;strong> and press enter. Now, open up a text editor, such as gedit and navigate to the config folder in the tmp folder we just extracted. Open up the file "run.lua". The problem is that Lexmark misspelled ownership as ownhership, which broke the installer. Around line 1484, you will find a line that says</p>
<blockquote><p>if tonumber(ownhership[1]) == 0 then<&#47;blockquote><br />
delete the errant h in the word ownership and save the file. Now, go back to your terminal and run <strong>sudo sh startupinstaller.sh<&#47;strong> in the tmp folder. The installer will work as expected now.</p>
<p>Update: Special thanks to&Acirc;&nbsp;Mathieu Triclot for your $5 donation! Glad I could help! :)</p>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="border: none; float: right;" src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;06&#47;pixy12.gif" alt="" &#47;><&#47;div></p>
