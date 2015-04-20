---
layout: post
status: publish
published: true
title: Closer to a Proper Froyo Limit Removal Fix
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 677
wordpress_url: http://www.dylanmtaylor.com/?p=677
date: '2010-10-19 22:14:10 +0000'
date_gmt: '2010-10-19 22:14:10 +0000'
---
<p>So, I recently managed to get the limit removed (manually) in the <a class="zem_slink" title="Android" rel="homepage" href="http:&#47;&#47;code.google.com&#47;android&#47;">Android 2.2<&#47;a> emulator found in the <a class="zem_slink" title="Android SDK" rel="homepage" href="http:&#47;&#47;developer.android.com&#47;sdk&#47;index.html">Android SDK<&#47;a>. This proves that it is possible, and I hope to have an automated fix out soon. For those of you who can't wait (rooted device required) -- try this:</p>
<ul>
<li>Download the<a href="http:&#47;&#47;developer.android.com&#47;sdk&#47;index.html"> Android SDK<&#47;a><&#47;li>
<li>Put your device into development mode (Go to Settings > Applications > Development, and make sure USB Debugging is enabled)<&#47;li>
<li>Plug your device into your computer's USB port<&#47;li>
<li>Make sure you are connected to your device by running <strong>adb devices<&#47;strong><&#47;li>
<li>Use cd to <a class="zem_slink" title="Cd (command)" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Cd_%28command%29">change directory<&#47;a> to the tools directory of the SDK<&#47;li>
<li>Run <strong>adb shell<&#47;strong><&#47;li>
<li>Type <strong>su<&#47;strong> and hit enter<&#47;li>
<li>Type<strong> remount rw<&#47;strong> and hit enter. Depending on your phone, this may not work, and you might get a command not found error. If so, try "<strong>mount -o remount,rw -t yaffs2 &#47;dev&#47;block&#47;mtdblock3 &#47;system<&#47;strong>". If you are testing this on the Android Emulator, the command you want is "<strong>mount -o remount,rw -t yaffs2 &#47;dev&#47;block&#47;mtdblock0 &#47;system<&#47;strong>". If none of these commands work, look for your device's command to remount the filesystem in read-write mode by searching on Google, and type that instead. This step in <strong>not<&#47;strong> optional. It will not work if you skip this step.<&#47;li>
<li>Now type <strong>exit<&#47;strong> and hit enter, repeat if you aren't out of adb shell yet<&#47;li>
<li>Type<strong> adb pull &#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db<&#47;strong> and hit enter
<ul>
<li>If you get an error saying "failed to copy '&#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db' to '.&#47;settings.db': Permission denied", make sure that you remounted your filesystem in read-write mode. This could be the problem. If it still does not work after you make sure that you remounted your filesystem properly, try these steps which worked for me:
<ul>
<li>Go back into <strong>adb shell<&#47;strong><&#47;li>
<li>Type <strong>su <&#47;strong>and hit enter to get root access<strong><br />
<&#47;strong><&#47;li></p>
<li>Type, letter for letter, "<strong>cat &#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db > &#47;data&#47;local&#47;settings.db<&#47;strong>" and hit enter<&#47;li>
<li>Now type <strong>exit<&#47;strong> twice to get out of adb shell<&#47;li>
<li>In your regular terminal (not adb shell) type "<strong>adb pull &#47;data&#47;local&#47;settings.db<&#47;strong>" and hit enter.<&#47;li><br />
<&#47;ul><br />
<&#47;li><br />
<&#47;ul><br />
<&#47;li></p>
<li>Type <strong>sqlite3 settings.db <&#47;strong>and hit enter<&#47;li>
<li>Type (letter for letter) these lines, hitting enter after each one:<&#47;li><br />
<&#47;ul></p>
<pre>INSERT INTO gservices (name, value) VALUES ('sms_outgoing_check_max_count', 999999999);<br />
INSERT INTO secure (name, value) VALUES ('sms_outgoing_check_max_count', 999999999);<br />
INSERT INTO gservices (name, value) VALUES ('sms_outgoing_check_interval_ms', 0);<br />
INSERT INTO secure (name, value) VALUES ('sms_outgoing_check_interval_ms', 0);<br />
.quit<&#47;pre></p>
<ul>
<li>If you are on Android 2.2 or newer, it is <strong><em>perfectly normal<&#47;em><&#47;strong> to get "no such table" error messages when entering the gservices lines. Just ignore those. It will still work.<&#47;li>
<li>You should be out of the sqlite editor, and back to your shell.<&#47;li>
<li>Type <strong>adb push settings.db &#47;data&#47;local&#47;<&#47;strong> and hit enter<&#47;li>
<li>Now, go back into <strong>adb shell<&#47;strong> (just type adb shell and hit enter)<&#47;li>
<li>Verify that you have a<em><strong> #<&#47;strong><&#47;em> in your shell(not a $), which means that you have root access.<&#47;li>
<li>If you do not have a # in your shell, try typing <strong>su<&#47;strong>...<&#47;li>
<li>Type <strong>cd &#47;data&#47;local<&#47;strong> to get to the directory where we just stored the modified settings database<&#47;li>
<li>type <strong>ls <&#47;strong>to list the files in the directory, and verify that <strong><em>settings.db<&#47;em><&#47;strong> is in the list of files<&#47;li>
<li>Now, letter for letter, type <span id=":kq"><strong>cat settings.db > &#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db<&#47;strong> and hit enter<&#47;span><&#47;li>
<li><span id=":kq">Nothing should appear on the screen. This is perfectly fine.<&#47;span><&#47;li>
<li><span id=":kq">Now, let's verify that the file was written properly before rebooting the phone...<&#47;span><&#47;li>
<li><span id=":kq">Type <&#47;span><strong><span id=":fm">cmp -l &#47;data&#47;local&#47;settings.db &#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db<&#47;span><&#47;strong><&#47;li>
<li><span id=":fm">Nothing should come up from that either. If something does, the database was <strong>not <&#47;strong>copied properly. Go back to the last <strong>cat <&#47;strong>command step. Otherwise, your database has been modified successfully. Congratulations!<br />
<&#47;span><&#47;li></p>
<li><span id=":fm">Now, exit the shell again, by typing <strong>exit<&#47;strong> and hitting enter until you are no longer in adb shell, just like last time.<br />
<&#47;span><&#47;li></p>
<li>The settings file should be updated on your device. This will not be applied until you reboot your device.<&#47;li>
<li>To reboot your phone, type <strong>adb reboot <&#47;strong>and hit enter.<&#47;li><br />
<&#47;ul><br />
<del>I haven't tried that method, since automatic removal works perfectly on  my <a class="zem_slink" title="Samsung i9000 Galaxy S" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Samsung_i9000_Galaxy_S">Samsung Epic 4G<&#47;a> running Android 2.1, but let me know if that works  for you by leaving a comment on this post, or by sending me an email<&#47;del>. This method has been updated, and it works <em>perfectly<&#47;em> on my Samsung Epic 4G running a leaked ROM of Android 2.2.</p>
<p><strong>UPDATE: <&#47;strong>I recently found out that WordPress changes certain characters slightly, which causes the <a class="zem_slink" title="SQLite" rel="wikipedia" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;SQLite">SQLite<&#47;a> commands above to not work properly. The SQLite commands are now in <strong>
<pre> <&#47;strong>tags to prevent this from happening. This may be the reason that manual removal failed before for some users. Also, rather than pushing the file directly to the settings database, the guide is updated to push it to <strong>&#47;data&#47;local&#47;<&#47;strong> and overwrite it as root using <strong>cat<&#47;strong>.</p>
<p><strong>UPDATE 2 (10&#47;21&#47;2010):<&#47;strong> I successfully got this working on someone's phone, and they no longer have a sending limit (verified)! Special thanks to Jacob Miller for helping me out and for his patience while we tried commands on his Droid (Original), until we eventually got it working! :) This guide has been updated to reflect the changes in the process that were necessary in order to get it to work.</p>
<p><strong>UPDATE 3 (11&#47;12&#47;2010):<&#47;strong> On my Epic 4G running the leaked Android 2.2 Froyo ROM, I was unable to pull the settings.db file directly. I updated the instructions to include a workaround that worked for me.</p>
<p><strong>NOTE: <&#47;strong>I have tested this method on the Android 2.2 emulator three different times, and it worked each one. I want to automate the process on actual, rooted devices, but at the moment, it only works on 2.1 unfortunately.</p>
<div id="_mcePaste" class="mcePaste" style="position:absolute;left:-10000px;top:544px;width:1px;height:1px;overflow:hidden;"><strong>adb push settings.db &#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db<&#47;strong><&#47;div></p>
