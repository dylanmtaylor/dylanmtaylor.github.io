---
layout: post
status: publish
published: false
title: A Simple JavaScript Dice Rolling Site
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2011-03-28 20:34:27 +0000'
date_gmt: '2011-03-28 20:34:27 +0000'
---
<div class="zemanta-img" style="margin: 1em; display: block;">
<p>[caption id="" align="alignleft" width="300" caption="Image via Wikipedia"]<a href="/images/blog/2011/06/FilePNG_transparency_demonstration_2.png"><img title="Portable Network Graphics" src="/images/blog/2011/03/300px-PNG_transparency_demonstration_22.png" alt="Portable Network Graphics" width="300" height="225" /></a>[/caption]</p>
</div>
<p>I haven't been blogging very much about my recent projects lately, and I've been putting off writing about this one for a while, but I finally decided to share this. I recently created a <a class="zem_slink" title="JavaScript" rel="wikipedia" href="http://en.wikipedia.org/wiki/JavaScript">JavaScript</a> + <a class="zem_slink" title="Scalable Vector Graphics" rel="homepage" href="http://www.w3.org/Graphics/SVG/">SVG</a> dice rolling demo site, roughly based on the work done by Taylor Copeland on his <a href="http://taylorcopeland.com/jsDice/">JavaScript dice implementation</a>, as well as a lot of new code written by me, and part of an HTML5 <a class="zem_slink" title="Test suite" rel="wikipedia" href="http://en.wikipedia.org/wiki/Test_suite">test suite</a> written by Niels Leenheer that detects whether the user's browser supports inline SVG or not. This code should run just fine on all modern browsers, and if it fails to detect support for SVG images, it should fall back gracefully on pre-rasterized <a class="zem_slink" title="Portable Network Graphics" rel="wikipedia" href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a> images. The project is <a class="zem_slink" title="Open source" rel="wikipedia" href="http://en.wikipedia.org/wiki/Open_source">open-source</a>, and can be downloaded in it's entirety <a href="http://code.dylanmtaylor.com/dice/dice.7z">as a 7z archive</a>. The <a class="zem_slink" title="Source code" rel="wikipedia" href="http://en.wikipedia.org/wiki/Source_code">source code</a> of the page is dynamically generated using <a class="zem_slink" title="PHP" rel="wikipedia" href="http://en.wikipedia.org/wiki/PHP">PHP</a>, and it accepts GET parameters that affect the page returned. Also, if you look through the source code, you might just find a secret GET parameter or two... ;)</p>
<p><strong>EDIT: </strong>Somehow I managed to forget to link to the actual site, even though I linked to the 7z download. <a href="http://code.dylanmtaylor.com/dice/">Click here</a> to visit the site. Sorry about that!</p>

