---
layout: post
status: publish
published: false
title: LibreScribe, My Latest (and Most Challenging) Project
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2011-04-09 04:35:07 +0000'
date_gmt: '2011-04-09 04:35:07 +0000'
---
<div class="zemanta-img" style="margin: 1em; display: block;">
<div class="mceTemp" style="text-align: left;">
<dl class="wp-caption alignright" style="width: 213px;">
<dt class="wp-caption-dt"><a href="http://www.crunchbase.com/company/livescribe"><img title="Image representing Livescribe  as depicted in ..." src="/images/blog/2011/04/49513v1-max-450x4501.png" alt="Image representing Livescribe  as depicted in ..." width="203" height="67" /></a></dt>
<dd class="wp-caption-dd zemanta-img-attribution" style="font-size: 0.8em;">Image via CrunchBase</dd>
</dl>
</div>
</div>
<p>Over the past few days, I've been working on attempting to code an <a class="zem_slink" title="Open source" rel="wikipedia" href="http://en.wikipedia.org/wiki/Open_source">open source</a> Smartpen Manager for <a class="zem_slink" title="Livescribe " rel="homepage" href="http://www.livescribe.com">Livescribe</a> devices, based off of the work done in Steven Walter's <a href="http://dasbrennen.isa-geek.org/~srwalter/gitweb/gitweb.cgi?p=libsmartpen.git;a=summary">libsmartpen</a> project, which hasn't been updated for months. The project is called "LibreScribe", and <a title="LibreScribe on github" href="https://github.com/dylanmtaylor/LibreScribe">the source code is already on github right now</a>. The code will be written primarily in<a href="http://en.wikipedia.org/wiki/C%2B%2B"> C++</a>, with limited functionality (such as threads) from <a href="http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3092.pdf">the upcoming C++0x standard</a>, and it will use <a href="http://www.wxwidgets.org/">wxWidgets</a> for the <a class="zem_slink" title="Graphical user interface" rel="wikipedia" href="http://en.wikipedia.org/wiki/Graphical_user_interface">graphical user interface</a>, which will be built using <a href="http://wxformbuilder.org/">wxFormBuilder</a>, attempting to follow the <a href="http://tango.freedesktop.org/Tango_Desktop_Project">Tango guidelines</a> as close as possible. So far, I have only scratched the surface of all the coding that will be necessary, so it would be great if some of the coders reading this would step up to the plate and help out. Even small things, such as documenting functions, adding comments, ensuring source code style consistency, and making it easier to maintain the source code are incredibly important. Right now, there's still tons of work to do. So much, in fact, that it's actually easier to list what's done than what's left to do. Right now, I'm focusing on fixing bugs and writing functions to check the status of the connected Smartpen. To be more specific, some of the most important bugs at the moment include:</p>
<ul>
<li>When the user plugs in or unplugs the device, the background thread updates the status of the device behind the scenes, but nothing is reflected in the <a class="zem_slink" title="User interface" rel="wikipedia" href="http://en.wikipedia.org/wiki/User_interface">user interface</a>.</li>
<li>Clicking the "Device Information" button twice without closing the program results in a <a href="http://en.wikipedia.org/wiki/Segmentation_fault">segmentation fault</a>.</li>
<li>Currently, only <a href="http://www.livescribe.com/en-us/smartpen/pulse/">LiveScribe Pulse</a> devices are detected. <a href="http://www.livescribe.com/en-us/smartpen/echo/">LiveScribe Echo</a> devices <em>should</em> work, but I can't check the <a class="zem_slink" title="Universal Serial Bus" rel="wikipedia" href="http://en.wikipedia.org/wiki/Universal_Serial_Bus">USB</a> product ID property of them without physical access to one.</li>
<li>The program is not currently capable of retrieving the name of the Smartpen. More <a href="http://en.wikipedia.org/wiki/OBject_EXchange">OBEX</a> analysis is necessary to determine how the <a href="http://www.livescribe.com/en-us/starthere/">official desktop client</a> retrieves the name of the Smartpen.</li>
</ul>
<p>Once I have all of these bugs fixed, I will begin working on adding more of the code from libsmartpen into the project, fixing up existing code, and writing new code. This is probably one of the toughest coding projects I've started, but I enjoy the challenge, and I hope to create something genuinely useful to the <a class="zem_slink" title="Free software community" rel="wikipedia" href="http://en.wikipedia.org/wiki/Free_software_community">open source community</a>, improve my own coding ability, and learn new things. I frequently push changes to github, as long as I don't notice any significant regressions, so you can track my progress in almost real-time. At the moment, the user interface is <a href="http://dylanmtaylor.com/?attachment_id=1026"><em>far</em> from being finished (link is a screenshot)</a>, but it's not too bad. Also, feel free to fork the <a class="zem_slink" title="Codebase" rel="wikipedia" href="http://en.wikipedia.org/wiki/Codebase">code base</a>, and make improvements.</p>
