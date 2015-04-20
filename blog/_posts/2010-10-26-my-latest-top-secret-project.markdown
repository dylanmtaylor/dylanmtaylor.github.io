---
layout: post
status: publish
published: true
title: My Latest Top-Secret Project
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
author_login: dylanmtaylor
author_email: dylan.m.taylor92@gmail.com
date: '2010-10-26 02:46:38 +0000'
date_gmt: '2010-10-26 02:46:38 +0000'
---
<p>I've been playing around a lot with different styles of <a class="zem_slink" title="Android" rel="homepage" href="http://code.google.com/android/">Android</a> <a class="zem_slink" title="User interface design" rel="wikipedia" href="http://en.wikipedia.org/wiki/User_interface_design">user interface design</a> lately, in order to practice developing for the platform. In my new top-secret project (coming soon!), I spent a lot of time really tweaking and customizing the <a class="zem_slink" title="User interface" rel="wikipedia" href="http://en.wikipedia.org/wiki/User_interface">user interface</a> in order to make it <a class="zem_slink" title="Look and feel" rel="wikipedia" href="http://en.wikipedia.org/wiki/Look_and_feel">look and feel</a> great. Some new techniques I've been experimenting with include: custom background images (with <a class="zem_slink" title="XML" rel="wikipedia" href="http://en.wikipedia.org/wiki/XML">XML</a> layouts), custom spinner layouts, <a class="zem_slink" title="Font" rel="wikipedia" href="http://en.wikipedia.org/wiki/Font">font style</a> and color, <a class="zem_slink" title="Alpha compositing" rel="wikipedia" href="http://en.wikipedia.org/wiki/Alpha_compositing">alpha-transparency</a>, and a couple of other neat tricks. In addition to that, I also worked on really optimizing the graphics used in the <a class="zem_slink" title="Application software" rel="wikipedia" href="http://en.wikipedia.org/wiki/Application_software">application</a> to reduce file size. How does this all fit together? You'll soon find out, when I release one of my best looking applications (visually) yet. In addition to just graphical user interface design, I have also been playing around a lot with offloading processing by utilizing <a class="zem_slink" title="Server-side scripting" rel="wikipedia" href="http://en.wikipedia.org/wiki/Server-side_scripting">server side scripting</a> (sometimes referred to as "<a class="zem_slink" title="Cloud computing" rel="wikipedia" href="http://en.wikipedia.org/wiki/Cloud_computing">Cloud Computing</a>"), and <a class="zem_slink" title="Application programming interface" rel="wikipedia" href="http://en.wikipedia.org/wiki/Application_programming_interface">API calls</a>, in this case, to a dynamically updating data feed. In my upcoming application, I learned a lot about sending queries to a server, and <a class="zem_slink" title="Parsing" rel="wikipedia" href="http://en.wikipedia.org/wiki/Parsing">parsing</a> the output that is returned in an optimized and efficient way in order to improve reliability over a wireless network. For instance:</p>
<ul>
<li>In my new project, all the data I need is queried and then parsed on the server side into a comma separated value file that is less than 1.5KB of data!</li>
<li>Once the data is retrieved, it is parsed on the client side into arrays using string tokenizers and buffered readers so that it can be accessed quickly without a lot of extra processing.</li>
<li>No third party libraries that are not included in Android itself are used or needed in order to retrieve and parse any of the data. All of the parsing and retrieving is hand coded from scratch.</li>
<li>When a network connection is not available, my application takes advantage of a cached copy of data stored on the phone itself (remember how I said the <em>entire</em> set of data is less than 1.5kb?)</li>
</ul>
<p>Haven't guessed what I'm working on yet? That's ok... stay tuned for more updates and some screenshots as I continue to work on this project. Keep in mind that I will also be working on improving my old applications, such as EliteBomb, at the same time, and it may take a while for me to finally release this. My new application will be free, and it's mostly just a practice application in order to improve my skills at coding Android applications and possibly increase my user-base, but I will continue to support it as well as all of my other applications.</p>
