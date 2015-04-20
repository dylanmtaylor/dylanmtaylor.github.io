---
layout: post
status: publish
published: true
title: Clippy Public Beta 0.1.6 is in progress
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: dylanmtaylor
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 457
wordpress_url: http://www.dylanmtaylor.com/?p=457
date: '2010-08-21 21:17:16 +0000'
date_gmt: '2010-08-21 21:17:16 +0000'
---
<p>I've been working on the next iteration of the Clippy project, Clippy Public Beta 0.1.6. In this release, I have made several <em>major</em> changes already, including:</p>
<ul>
<li>All reading/writing to the database is now handled by the Clippy Service</li>
<li>Adding a notification bar icon, as well as a notification that allows you to easily get back into Clippy from the notification bar</li>
<li>Created a custom notification layout for usage in the notification bar</li>
<li>Fixing a major bug where rotating the screen would restart the Clippy Service (only noticeable in verbose mode)</li>
<li>Moving most <a class="zem_slink" title="Hard coding" rel="wikipedia" href="http://en.wikipedia.org/wiki/Hard_coding">hard-coded</a> strings into a string resource file to allow for easier localization</li>
<li>Adding several additional log messages</li>
<li>Implementing an <a href="http://developer.android.com/guide/developing/tools/aidl.html">AIDL interface</a> to allow other classes to interact with the service</li>
<li>Added several more preferences in the settings menu</li>
<li>Added debugging tools, including the ability to replace all of your clippings with sample content copied from <a class="zem_slink" title="Wikipedia" rel="homepage" href="http://www.wikipedia.org">Wikipedia</a></li>
<li>Completely recreated the "About" tab layout from scratch, using <em>much</em> better written code</li>
<li>Enabled the "testing mode" for <a class="zem_slink" title="AdMob" rel="homepage" href="http://www.admob.com">AdMob</a> ads when the application is running in the emulator</li>
<li>The find functionality now works perfectly, and the background of the interface for find is now transparent instead of being solid black</li>
<li>The "Search" button now opens/closes the find bar for easy access to the find functionality</li>
<li>Added a preference to the Settings screen that allows you to choose whether or not the find function is case sensitive (by default, the find function does not pay attention to case)</li>
</ul>
<p>And several other, less noteworthy improvements. I am planning on releasing this new version to the <a class="zem_slink" title="Android Market" rel="homepage" href="http://www.android.com/market/">Android Market</a> soon.</p>
