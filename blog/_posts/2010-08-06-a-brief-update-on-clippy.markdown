---
layout: post
status: publish
published: false
title: A Brief Update on the Status of Clippy
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2010-08-06 16:17:00 +0000'
date_gmt: '2010-08-06 16:17:00 +0000'
---
<p><a href="/images/blog/2010/12/clippy-logo1.png"><img class="alignleft size-thumbnail wp-image-123" title="Clippy Logo" src="/images/blog/2010/11/clippy-logo1.png" alt="" width="108" height="108" /></a>Ever since <a title="An Open Discussion About the Future of Clippy" href="/pages/blog/2010/08/05/an-open-discussion-about-the-future-of-clippy/">my last (extremely lengthy) post</a>, which detailed my plans for the future of Clippy, I haven't really updated you on the progress of development, so I wanted to take some time to do so. Rest assured, this post will be much more brief and to the point, since I know it's somewhat of a pain to read that much. Anyways, I have begun working on a <a title="Android Services" href="http://developer.android.com/reference/android/app/Service.html">background service</a> that will automatically check whether or not any the user made any modifications to the clipboard. Right now, it's in such an early stage of development that I don't even feel comfortable shipping this with a beta release. I know that several users are probably anxious to get their hands on this functionality, but really, the code is such a mess, that if you had it available to you, you would realize that it would be worth waiting for me to refine it some more. Here's a summary of the progress as of now:</p>
<ul>
<li>The background service starts automatically with the program</li>
<li>There are currently no settings for the background service, or any way to turn the service off
<ul>
<li>All settings are currently "<a title="Hard coding article on Wikipedia" href="http://developer.android.com/reference/android/app/Service.html">hard-coded</a>".</li>
<li>I want to have a full settings interface available before I even consider shipping the program with the service
<ul>
<li>There is a possibility that I will ship another release before I finish coding the background service. In that case, I will hard code a <a title="boolean data type" href="http://en.wikipedia.org/wiki/Boolean_data_type">boolean </a>value into the program that determines whether or not to start the service to always be "false".  Even if the service is in the code, it will not start, so users won't notice a difference except for a new '<a title="Class in Programming" href="http://en.wikipedia.org/wiki/Class_%28computer_science%29">class</a>' called "<strong>ClippyService</strong>" in the .apk file sent to your device, and a modified <a title="Android Manifest File" href="http://developer.android.com/guide/topics/manifest/manifest-intro.html">manifest</a>.</li>
</ul>
</li>
</ul>
</li>
<li>Right now, the service is not capable of dynamically changing how often to check the clipboard based on the user's activity. It's currently hard-coded to check the clipboard every second, to make it easier to develop.</li>
<li>As I have the service coded at the moment, every time the clipboard changes, it prompts the user to either enter a title for the new clipping, or choose cancel if they do not want to change it. If you believe you have a more elegant solution, let me know either in the comments section, or via e-mail.</li>
<li>There is currently absolutely no notification what-so-ever that the service is running. The only way to turn it off once it starts is with a program such as "<a title="Advanced Task Killer" href="http://rechild.mobi/">Advanced Task Killer</a>" by ReChild (an <strong>excellent</strong> application, by the way).</li>
<li>I've only tested the background service in the emulator provided with the <a class="zem_slink" title="Android" rel="homepage" href="http://code.google.com/android/">Android SDK</a>, running stock <a title="Android 2.2" href="http://developer.android.com/sdk/android-2.2-highlights.html">Android 2.2 (FroYo)</a>, the latest official version of Android. I'm not sure how well it will perform on an actual device, but based only on how this is currently coded, I'm going to be a bit of a pessimist, and assume that it will be a bit of a battery hog since it checks for clipboard changes every second.
<ul>
<li>By the time I get the background service feature into a version that I ship to the Android market, there will be an option in the menu that I have yet to create, allowing you to enable/disable automatically adjusting how often the service checks the clipboard based on the average frequency of changes.</li>
<li>There will also be an option to manually adjust the delay, allowing you to set the value to whatever you feel is best for your needs, and for your battery life. This will allow you to balance between response time and battery life.
<ul>
<li>I am planning on making the user settable delay between 1 seconds and 2 minutes (120 seconds). I was originally thinking along the lines of 1 second and 5 minutes, but I realized that it is likely the user will change the clipboard more than once in those 5 minutes, and lose an important clipping, or become impatient waiting for the clipping to save. Because the user will be able to completely disable the service, however, it shouldn't be that much of an issue to have the period between checks this short, and if it is, I will change that in a future release.</li>
<li>I plan on allowing users to set the value using a "slider" that you slide to the left or right to set the value, accompanied with a text box for manual value entry. This probably requires me to make a custom class, as I don't think <a class="zem_slink" title="Google" rel="homepage" href="http://google.com">Google</a> provides this functionality with the default Android <a class="zem_slink" title="Application programming interface" rel="wikipedia" href="http://en.wikipedia.org/wiki/Application_programming_interface">APIs</a>, but I could be wrong. I'll continue to look into it.</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>I did not even start working on a widget yet. Because I have no experience in making an Android widget what-so-ever, I don't feel comfortable even trying to make one for this application, until I am sure the rest of the code is in a pretty decent state, and the application is usable for everyday usage. I honestly hope that Clippy will become good enough for it to be something that someone would honestly consider using every day to help them stay organized someday, but in order for that to happen, Clippy needs to be easy to use, elegant, and powerful. At the same time, I don't want it to be a performance/battery hog, so I have to be careful about how I code the program, so that everything is reasonably efficient, yet still responsive and easy/fun to use. Also, you may not see any updates from me for a while, as I'm going on a brief vacation with my family to Deep Creek, <a class="zem_slink" title="Maryland" rel="geolocation" href="http://maps.google.com/maps?ll=39.0,-76.7&amp;spn=3.0,3.0&amp;q=39.0,-76.7%20%28Maryland%29&amp;t=h">Maryland</a>. After I get back, development work will resume as usual. I plan on getting find and replace functionality working soon.</p>
