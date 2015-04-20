---
layout: post
status: publish
published: true
title: LibreScribe, My Latest (and Most Challenging) Project
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 1024
wordpress_url: http://dylanmtaylor.com/?p=1024
date: '2011-04-09 04:35:07 +0000'
date_gmt: '2011-04-09 04:35:07 +0000'
---
<div class="zemanta-img" style="margin: 1em; display: block;">
<div class="mceTemp" style="text-align: left;">
<dl class="wp-caption alignright" style="width: 213px;">
<dt class="wp-caption-dt"><a href="http:&#47;&#47;www.crunchbase.com&#47;company&#47;livescribe"><img title="Image representing Livescribe  as depicted in ..." src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;04&#47;49513v1-max-450x4501.png" alt="Image representing Livescribe  as depicted in ..." width="203" height="67" &#47;><&#47;a><&#47;dt>
<dd class="wp-caption-dd zemanta-img-attribution" style="font-size: 0.8em;">Image via CrunchBase<&#47;dd> <&#47;dl><&#47;div><br />
<&#47;div><br />
Over the past few days, I've been working on attempting to code an <a class="zem_slink" title="Open source" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Open_source">open source<&#47;a> Smartpen Manager for <a class="zem_slink" title="Livescribe " rel="homepage" href="http:&#47;&#47;www.livescribe.com">Livescribe<&#47;a> devices, based off of the work done in Steven Walter's <a href="http:&#47;&#47;dasbrennen.isa-geek.org&#47;~srwalter&#47;gitweb&#47;gitweb.cgi?p=libsmartpen.git;a=summary">libsmartpen<&#47;a> project, which hasn't been updated for months. The project is called "LibreScribe", and <a title="LibreScribe on github" href="https:&#47;&#47;github.com&#47;aliendude5300&#47;LibreScribe">the source code is already on github right now<&#47;a>. The code will be written primarily in<a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;C%2B%2B"> C++<&#47;a>, with limited functionality (such as threads) from <a href="http:&#47;&#47;www.open-std.org&#47;jtc1&#47;sc22&#47;wg21&#47;docs&#47;papers&#47;2010&#47;n3092.pdf">the upcoming C++0x standard<&#47;a>, and it will use <a href="http:&#47;&#47;www.wxwidgets.org&#47;">wxWidgets<&#47;a> for the <a class="zem_slink" title="Graphical user interface" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Graphical_user_interface">graphical user interface<&#47;a>, which will be built using <a href="http:&#47;&#47;wxformbuilder.org&#47;">wxFormBuilder<&#47;a>, attempting to follow the <a href="http:&#47;&#47;tango.freedesktop.org&#47;Tango_Desktop_Project">Tango guidelines<&#47;a> as close as possible. So far, I have only scratched the surface of all the coding that will be necessary, so it would be great if some of the coders reading this would step up to the plate and help out. Even small things, such as documenting functions, adding comments, ensuring source code style consistency, and making it easier to maintain the source code are incredibly important. Right now, there's still tons of work to do. So much, in fact, that it's actually easier to list what's done than what's left to do. Right now, I'm focusing on fixing bugs and writing functions to check the status of the connected Smartpen. To be more specific, some of the most important bugs at the moment include:</p>
<ul>
<li>When the user plugs in or unplugs the device, the background thread updates the status of the device behind the scenes, but nothing is reflected in the <a class="zem_slink" title="User interface" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;User_interface">user interface<&#47;a>.<&#47;li>
<li>Clicking the "Device Information" button twice without closing the program results in a <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Segmentation_fault">segmentation fault<&#47;a>.<&#47;li>
<li>Currently, only <a href="http:&#47;&#47;www.livescribe.com&#47;en-us&#47;smartpen&#47;pulse&#47;">LiveScribe Pulse<&#47;a> devices are detected. <a href="http:&#47;&#47;www.livescribe.com&#47;en-us&#47;smartpen&#47;echo&#47;">LiveScribe Echo<&#47;a> devices <em>should<&#47;em> work, but I can't check the <a class="zem_slink" title="Universal Serial Bus" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Universal_Serial_Bus">USB<&#47;a> product ID property of them without physical access to one.<&#47;li>
<li>The program is not currently capable of retrieving the name of the Smartpen. More <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;OBject_EXchange">OBEX<&#47;a> analysis is necessary to determine how the <a href="http:&#47;&#47;www.livescribe.com&#47;en-us&#47;starthere&#47;">official desktop client<&#47;a> retrieves the name of the Smartpen.<&#47;li><br />
<&#47;ul><br />
Once I have all of these bugs fixed, I will begin working on adding more of the code from libsmartpen into the project, fixing up existing code, and writing new code. This is probably one of the toughest coding projects I've started, but I enjoy the challenge, and I hope to create something genuinely useful to the <a class="zem_slink" title="Free software community" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Free_software_community">open source community<&#47;a>, improve my own coding ability, and learn new things. I frequently push changes to github, as long as I don't notice any significant regressions, so you can track my progress in almost real-time. At the moment, the user interface is <a href="http:&#47;&#47;dylanmtaylor.com&#47;?attachment_id=1026"><em>far<&#47;em> from being finished (link is a screenshot)<&#47;a>, but it's not too bad. Also, feel free to fork the <a class="zem_slink" title="Codebase" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Codebase">code base<&#47;a>, and make improvements.</p>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="border: medium none; float: right;" src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;06&#47;pixy11.gif" alt="" &#47;><&#47;div></p>
