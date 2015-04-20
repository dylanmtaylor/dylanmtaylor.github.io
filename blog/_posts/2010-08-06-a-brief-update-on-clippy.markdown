---
layout: post
status: publish
published: true
title: A Brief Update on the Status of Clippy
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 238
wordpress_url: http://www.dylanmtaylor.com/?p=238
date: '2010-08-06 16:17:00 +0000'
date_gmt: '2010-08-06 16:17:00 +0000'
---
<p><a href="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2010&#47;12&#47;clippy-logo1.png"><img class="alignleft size-thumbnail wp-image-123" title="Clippy Logo" src="http:&#47;&#47;www.dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2010&#47;11&#47;clippy-logo1.png" alt="" width="108" height="108" &#47;><&#47;a>Ever since <a title="An Open Discussion About the Future of Clippy" href="http:&#47;&#47;www.dylanmtaylor.com&#47;2010&#47;08&#47;05&#47;an-open-discussion-about-the-future-of-clippy&#47;">my last (extremely lengthy) post<&#47;a>, which detailed my plans for the future of Clippy, I haven't really updated you on the progress of development, so I wanted to take some time to do so. Rest assured, this post will be much more brief and to the point, since I know it's somewhat of a pain to read that much. Anyways, I have begun working on a <a title="Android Services" href="http:&#47;&#47;developer.android.com&#47;reference&#47;android&#47;app&#47;Service.html">background service<&#47;a> that will automatically check whether or not any the user made any modifications to the clipboard. Right now, it's in such an early stage of development that I don't even feel comfortable shipping this with a beta release. I know that several users are probably anxious to get their hands on this functionality, but really, the code is such a mess, that if you had it available to you, you would realize that it would be worth waiting for me to refine it some more. Here's a summary of the progress as of now:</p>
<ul>
<li>The background service starts automatically with the program<&#47;li>
<li>There are currently no settings for the background service, or any way to turn the service off
<ul>
<li>All settings are currently "<a title="Hard coding article on Wikipedia" href="http:&#47;&#47;developer.android.com&#47;reference&#47;android&#47;app&#47;Service.html">hard-coded<&#47;a>".<&#47;li>
<li>I want to have a full settings interface available before I even consider shipping the program with the service
<ul>
<li>There is a possibility that I will ship another release before I finish coding the background service. In that case, I will hard code a <a title="boolean data type" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Boolean_data_type">boolean <&#47;a>value into the program that determines whether or not to start the service to always be "false".&Acirc;&nbsp; Even if the service is in the code, it will not start, so users won't notice a difference except for a new '<a title="Class in Programming" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Class_%28computer_science%29">class<&#47;a>' called "<strong>ClippyService<&#47;strong>" in the .apk file sent to your device, and a modified <a title="Android Manifest File" href="http:&#47;&#47;developer.android.com&#47;guide&#47;topics&#47;manifest&#47;manifest-intro.html">manifest<&#47;a>.<&#47;li><br />
<&#47;ul><br />
<&#47;li><br />
<&#47;ul><br />
<&#47;li></p>
<li>Right now, the service is not capable of dynamically changing how often to check the clipboard based on the user's activity. It's currently hard-coded to check the clipboard every second, to make it easier to develop.<&#47;li>
<li>As I have the service coded at the moment, every time the clipboard changes, it prompts the user to either enter a title for the new clipping, or choose cancel if they do not want to change it. If you believe you have a more elegant solution, let me know either in the comments section, or via e-mail.<&#47;li>
<li>There is currently absolutely no notification what-so-ever that the service is running. The only way to turn it off once it starts is with a program such as "<a title="Advanced Task Killer" href="http:&#47;&#47;rechild.mobi&#47;">Advanced Task Killer<&#47;a>" by ReChild (an <strong>excellent<&#47;strong> application, by the way).<&#47;li>
<li>I've only tested the background service in the emulator provided with the <a class="zem_slink" title="Android" rel="homepage" href="http:&#47;&#47;code.google.com&#47;android&#47;">Android SDK<&#47;a>, running stock <a title="Android 2.2" href="http:&#47;&#47;developer.android.com&#47;sdk&#47;android-2.2-highlights.html">Android 2.2 (FroYo)<&#47;a>, the latest official version of Android. I'm not sure how well it will perform on an actual device, but based only on how this is currently coded, I'm going to be a bit of a pessimist, and assume that it will be a bit of a battery hog since it checks for clipboard changes every second.
<ul>
<li>By the time I get the background service feature into a version that I ship to the Android market, there will be an option in the menu that I have yet to create, allowing you to enable&#47;disable automatically adjusting how often the service checks the clipboard based on the average frequency of changes.<&#47;li>
<li>There will also be an option to manually adjust the delay, allowing you to set the value to whatever you feel is best for your needs, and for your battery life. This will allow you to balance between response time and battery life.
<ul>
<li>I am planning on making the user settable delay between 1 seconds and 2 minutes (120 seconds). I was originally thinking along the lines of 1 second and 5 minutes, but I realized that it is likely the user will change the clipboard more than once in those 5 minutes, and lose an important clipping, or become impatient waiting for the clipping to save. Because the user will be able to completely disable the service, however, it shouldn't be that much of an issue to have the period between checks this short, and if it is, I will change that in a future release.<&#47;li>
<li>I plan on allowing users to set the value using a "slider" that you slide to the left or right to set the value, accompanied with a text box for manual value entry. This probably requires me to make a custom class, as I don't think <a class="zem_slink" title="Google" rel="homepage" href="http:&#47;&#47;google.com">Google<&#47;a> provides this functionality with the default Android <a class="zem_slink" title="Application programming interface" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Application_programming_interface">APIs<&#47;a>, but I could be wrong. I'll continue to look into it.<&#47;li><br />
<&#47;ul><br />
<&#47;li><br />
<&#47;ul><br />
<&#47;li><br />
<&#47;ul><br />
I did not even start working on a widget yet. Because I have no experience in making an Android widget what-so-ever, I don't feel comfortable even trying to make one for this application, until I am sure the rest of the code is in a pretty decent state, and the application is usable for everyday usage. I honestly hope that Clippy will become good enough for it to be something that someone would honestly consider using every day to help them stay organized someday, but in order for that to happen, Clippy needs to be easy to use, elegant, and powerful. At the same time, I don't want it to be a performance&#47;battery hog, so I have to be careful about how I code the program, so that everything is reasonably efficient, yet still responsive and easy&#47;fun to use. Also, you may not see any updates from me for a while, as I'm going on a brief vacation with my family to Deep Creek, <a class="zem_slink" title="Maryland" rel="geolocation" href="http:&#47;&#47;maps.google.com&#47;maps?ll=39.0,-76.7&amp;spn=3.0,3.0&amp;q=39.0,-76.7%20%28Maryland%29&amp;t=h">Maryland<&#47;a>. After I get back, development work will resume as usual. I plan on getting find and replace functionality working soon.</p>
