---
layout: post
status: publish
published: true
title: Clippy Public Beta 0.1.6 is in progress
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 457
wordpress_url: http://www.dylanmtaylor.com/?p=457
date: '2010-08-21 21:17:16 +0000'
date_gmt: '2010-08-21 21:17:16 +0000'
---
<p>I've been working on the next iteration of the Clippy project, Clippy Public Beta 0.1.6. In this release, I have made several <em>major<&#47;em> changes already, including:</p>
<ul>
<li>All reading&#47;writing to the database is now handled by the Clippy Service<&#47;li>
<li>Adding a notification bar icon, as well as a notification that allows you to easily get back into Clippy from the notification bar<&#47;li>
<li>Created a custom notification layout for usage in the notification bar<&#47;li>
<li>Fixing a major bug where rotating the screen would restart the Clippy Service (only noticeable in verbose mode)<&#47;li>
<li>Moving most <a class="zem_slink" title="Hard coding" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Hard_coding">hard-coded<&#47;a> strings into a string resource file to allow for easier localization<&#47;li>
<li>Adding several additional log messages<&#47;li>
<li>Implementing an <a href="http:&#47;&#47;developer.android.com&#47;guide&#47;developing&#47;tools&#47;aidl.html">AIDL interface<&#47;a> to allow other classes to interact with the service<&#47;li>
<li>Added several more preferences in the settings menu<&#47;li>
<li>Added debugging tools, including the ability to replace all of your clippings with sample content copied from <a class="zem_slink" title="Wikipedia" rel="homepage" href="http:&#47;&#47;www.wikipedia.org">Wikipedia<&#47;a><&#47;li>
<li>Completely recreated the "About" tab layout from scratch, using <em>much<&#47;em> better written code<&#47;li>
<li>Enabled the "testing mode" for <a class="zem_slink" title="AdMob" rel="homepage" href="http:&#47;&#47;www.admob.com">AdMob<&#47;a> ads when the application is running in the emulator<&#47;li>
<li>The find functionality now works perfectly, and the background of the interface for find is now transparent instead of being solid black<&#47;li>
<li>The "Search" button now opens&#47;closes the find bar for easy access to the find functionality<&#47;li>
<li>Added a preference to the Settings screen that allows you to choose whether or not the find function is case sensitive (by default, the find function does not pay attention to case)<&#47;li><br />
<&#47;ul><br />
And several other, less noteworthy improvements. I am planning on releasing this new version to the <a class="zem_slink" title="Android Market" rel="homepage" href="http:&#47;&#47;www.android.com&#47;market&#47;">Android Market<&#47;a> soon.</p>
