---
layout: post
status: publish
published: true
title: Fixing Lexmark Printer Driver Installation in Ubuntu 11.04
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
author_login: dylanmtaylor
author_email: dylan.m.taylor92@gmail.com
date: '2011-04-17 18:20:55 +0000'
date_gmt: '2011-04-17 18:20:55 +0000'
---
<p>Recently I just installed the <a class="zem_slink" title="Lexmark" rel="homepage" href="http://www.lexmark.com/">Lexmark</a> <a class="zem_slink" title="Printer driver" rel="wikipedia" href="http://en.wikipedia.org/wiki/Printer_driver">printer driver</a> in my 64-bit <a class="zem_slink" title="List of Ubuntu releases" rel="homepage" href="http://www.ubuntu.com/">Ubuntu 11.04</a> installation. As you may or may not notice, the installer is broken by default in Ubuntu 11.04, and it just exits with an error message, saying</p>
<blockquote><p><a class="zem_slink" title="Lua (programming language)" rel="homepage" href="http://www.lua.org">Lua</a> error detected: While parsing install.lua: config/run.lua:1374: attempt to index global 'ownhership' (a nil value)</p></blockquote>
<p>After playing with the installer, I finally got it to work <em>perfectly</em>, so I emailed the Lexmark support team to let them know how to fix this, but for now, I'm going to share what you need to do on my blog.</p>
<p>First, you need to extract the files for the installer. To do this, you need to run</p>
<blockquote><p>./lexmark-inkjet-legacy-wJRE-1.0-1.amd64.deb.sh --noexec --keep</p></blockquote>
<p>It's worth noting that there are two hyphens before noexec and keep. Once you run that command, the files for the installer will be extracted to the tmp folder in the <a class="zem_slink" title="Working directory" rel="wikipedia" href="http://en.wikipedia.org/wiki/Working_directory">current working directory</a>. For now, just type <strong>cd tmp</strong> and press enter. Now, open up a text editor, such as gedit and navigate to the config folder in the tmp folder we just extracted. Open up the file "run.lua". The problem is that Lexmark misspelled ownership as ownhership, which broke the installer. Around line 1484, you will find a line that says</p>
<blockquote><p>if tonumber(ownhership[1]) == 0 then</p></blockquote>
<p>delete the errant h in the word ownership and save the file. Now, go back to your terminal and run <strong>sudo sh startupinstaller.sh</strong> in the tmp folder. The installer will work as expected now.</p>
<p>Update: Special thanks to Mathieu Triclot for your $5 donation! Glad I could help! :)</p>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="border: none; float: right;" src="/images/blog/2011/06/pixy12.gif" alt="" /></div>
