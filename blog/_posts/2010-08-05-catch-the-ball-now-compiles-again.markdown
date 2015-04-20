---
layout: post
status: publish
published: true
title: Catch The Ball Now Compiles Again!
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 212
wordpress_url: http://www.dylanmtaylor.com/?p=212
date: '2010-08-05 00:05:54 +0000'
date_gmt: '2010-08-05 00:05:54 +0000'
---
<p>If you checked out the <a class="zem_slink" title="Source code" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Source_code">source code<&#47;a> for "Catch The Ball" lately, you might have noticed that the source code wasn't compiling. The reason for this is because even though I tested the code to compile and run before committing it to the repository, I added comments to the <a class="zem_slink" title="XML" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;XML">XML<&#47;a> files, stating that the file is a part of "Catch The Ball", and that it's licensed under version 3 of the <a class="zem_slink" title="GNU General Public License" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;GNU_General_Public_License">GNU General Public License<&#47;a>. What I didn't realize, however, is that the line  "<strong><xml version="1.0" encoding="UTF-8"?><&#47;strong>" needs to come first in the XML file, before any comments, or else the <a class="zem_slink" title="Compiler" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Compiler">compiler<&#47;a> will produce error messages. I pushed the code to the repository without realizing this, and then started working on fixing issues with Clippy, so I didn't find out about the problem until I tried to compile the Catch The Ball code again, at which point, I became extremely confused, as I knew I tested the code before committing it to git, and the only changes I made involved adding <a class="zem_slink" title="Internal documentation" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Internal_documentation">internal documentation<&#47;a> to the code, which shouldn't affect the application at all. Anyways, it's fixed now, and I just wanted to let you know.</p>
