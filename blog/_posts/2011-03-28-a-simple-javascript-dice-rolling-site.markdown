---
layout: post
status: publish
published: true
title: A Simple JavaScript Dice Rolling Site
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 1018
wordpress_url: http://dylanmtaylor.com/?p=1018
date: '2011-03-28 20:34:27 +0000'
date_gmt: '2011-03-28 20:34:27 +0000'
---
<div class="zemanta-img" style="margin: 1em; display: block;">
<p>[caption id="" align="alignleft" width="300" caption="Image via Wikipedia"]<a href="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;06&#47;FilePNG_transparency_demonstration_2.png"><img title="Portable Network Graphics" src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;03&#47;300px-PNG_transparency_demonstration_22.png" alt="Portable Network Graphics" width="300" height="225" &#47;><&#47;a>[&#47;caption]</p>
<p><&#47;div><br />
I haven't been blogging very much about my recent projects lately, and I've been putting off writing about this one for a while, but I finally decided to share this. I recently created a <a class="zem_slink" title="JavaScript" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;JavaScript">JavaScript<&#47;a> + <a class="zem_slink" title="Scalable Vector Graphics" rel="homepage" href="http:&#47;&#47;www.w3.org&#47;Graphics&#47;SVG&#47;">SVG<&#47;a> dice rolling demo site, roughly based on the work done by Taylor Copeland on his <a href="http:&#47;&#47;taylorcopeland.com&#47;jsDice&#47;">JavaScript dice implementation<&#47;a>, as well as a lot of new code written by me, and part of an HTML5 <a class="zem_slink" title="Test suite" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Test_suite">test suite<&#47;a> written by Niels Leenheer that detects whether the user's browser supports inline SVG or not. This code should run just fine on all modern browsers, and if it fails to detect support for SVG images, it should fall back gracefully on pre-rasterized <a class="zem_slink" title="Portable Network Graphics" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Portable_Network_Graphics">PNG<&#47;a> images. The project is <a class="zem_slink" title="Open source" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Open_source">open-source<&#47;a>, and can be downloaded in it's entirety <a href="http:&#47;&#47;code.dylanmtaylor.com&#47;dice&#47;dice.7z">as a 7z archive<&#47;a>. The <a class="zem_slink" title="Source code" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Source_code">source code<&#47;a> of the page is dynamically generated using <a class="zem_slink" title="PHP" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;PHP">PHP<&#47;a>, and it accepts GET parameters that affect the page returned. Also, if you look through the source code, you might just find a secret GET parameter or two... ;)</p>
<p><strong>EDIT: <&#47;strong>Somehow I managed to forget to link to the actual site, even though I linked to the 7z download.&Acirc;&nbsp;<a href="http:&#47;&#47;code.dylanmtaylor.com&#47;dice&#47;">Click here<&#47;a> to visit the site. Sorry about that!</p>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="border: none; float: right;" src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;06&#47;pixy10.gif" alt="" &#47;><&#47;div></p>
