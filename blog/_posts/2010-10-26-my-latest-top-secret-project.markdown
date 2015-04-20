---
layout: post
status: publish
published: true
title: My Latest Top-Secret Project
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 710
wordpress_url: http://www.dylanmtaylor.com/?p=710
date: '2010-10-26 02:46:38 +0000'
date_gmt: '2010-10-26 02:46:38 +0000'
---
<p>I've been playing around a lot with different styles of <a class="zem_slink" title="Android" rel="homepage" href="http:&#47;&#47;code.google.com&#47;android&#47;">Android<&#47;a> <a class="zem_slink" title="User interface design" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;User_interface_design">user interface design<&#47;a> lately, in order to practice developing for the platform. In my new top-secret project (coming soon!), I spent a lot of time really tweaking and customizing the <a class="zem_slink" title="User interface" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;User_interface">user interface<&#47;a> in order to make it <a class="zem_slink" title="Look and feel" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Look_and_feel">look and feel<&#47;a> great. Some new techniques I've been experimenting with include: custom background images (with <a class="zem_slink" title="XML" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;XML">XML<&#47;a> layouts), custom spinner layouts, <a class="zem_slink" title="Font" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Font">font style<&#47;a> and color, <a class="zem_slink" title="Alpha compositing" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Alpha_compositing">alpha-transparency<&#47;a>, and a couple of other neat tricks. In addition to that, I also worked on really optimizing the graphics used in the <a class="zem_slink" title="Application software" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Application_software">application<&#47;a> to reduce file size. How does this all fit together? You'll soon find out, when I release one of my best looking applications (visually) yet. In addition to just graphical user interface design, I have also been playing around a lot with offloading processing by utilizing <a class="zem_slink" title="Server-side scripting" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Server-side_scripting">server side scripting<&#47;a> (sometimes referred to as "<a class="zem_slink" title="Cloud computing" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Cloud_computing">Cloud Computing<&#47;a>"), and <a class="zem_slink" title="Application programming interface" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Application_programming_interface">API calls<&#47;a>, in this case, to a dynamically updating data feed. In my upcoming application, I learned a lot about sending queries to a server, and <a class="zem_slink" title="Parsing" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Parsing">parsing<&#47;a> the output that is returned in an optimized and efficient way in order to improve reliability over a wireless network. For instance:</p>
<ul>
<li>In my new project, all the data I need is queried and then parsed on the server side into a comma separated value file that is less than 1.5KB of data!<&#47;li>
<li>Once the data is retrieved, it is parsed on the client side into arrays using string tokenizers and buffered readers so that it can be accessed quickly without a lot of extra processing.<&#47;li>
<li>No third party libraries that are not included in Android itself are used or needed in order to retrieve and parse any of the data. All of the parsing and retrieving is hand coded from scratch.<&#47;li>
<li>When a network connection is not available, my application takes advantage of a cached copy of data stored on the phone itself (remember how I said the <em>entire<&#47;em> set of data is less than 1.5kb?)<&#47;li><br />
<&#47;ul><br />
Haven't guessed what I'm working on yet? That's ok... stay tuned for more updates and some screenshots as I continue to work on this project. Keep in mind that I will also be working on improving my old applications, such as EliteBomb, at the same time, and it may take a while for me to finally release this. My new application will be free, and it's mostly just a practice application in order to improve my skills at coding Android applications and possibly increase my user-base, but I will continue to support it as well as all of my other applications.</p>
