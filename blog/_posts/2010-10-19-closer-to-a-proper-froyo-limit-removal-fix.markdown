---
layout: post
status: publish
published: true
title: Closer to a Proper Froyo Limit Removal Fix
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
author_login: dylanmtaylor
author_email: dylan.m.taylor92@gmail.com
date: '2010-10-19 22:14:10 +0000'
date_gmt: '2010-10-19 22:14:10 +0000'
---
<p>So, I recently managed to get the limit removed (manually) in the <a class="zem_slink" title="Android" rel="homepage" href="http://code.google.com/android/">Android 2.2</a> emulator found in the <a class="zem_slink" title="Android SDK" rel="homepage" href="http://developer.android.com/sdk/index.html">Android SDK</a>. This proves that it is possible, and I hope to have an automated fix out soon. For those of you who can't wait (rooted device required) -- try this:</p>
<ul>
<li>Download the<a href="http://developer.android.com/sdk/index.html"> Android SDK</a></li>
<li>Put your device into development mode (Go to Settings &gt; Applications &gt; Development, and make sure USB Debugging is enabled)</li>
<li>Plug your device into your computer's USB port</li>
<li>Make sure you are connected to your device by running <strong>adb devices</strong></li>
<li>Use cd to <a class="zem_slink" title="Cd (command)" rel="wikipedia" href="http://en.wikipedia.org/wiki/Cd_%28command%29">change directory</a> to the tools directory of the SDK</li>
<li>Run <strong>adb shell</strong></li>
<li>Type <strong>su</strong> and hit enter</li>
<li>Type<strong> remount rw</strong> and hit enter. Depending on your phone, this may not work, and you might get a command not found error. If so, try "<strong>mount -o remount,rw -t yaffs2 /dev/block/mtdblock3 /system</strong>". If you are testing this on the Android Emulator, the command you want is "<strong>mount -o remount,rw -t yaffs2 /dev/block/mtdblock0 /system</strong>". If none of these commands work, look for your device's command to remount the filesystem in read-write mode by searching on Google, and type that instead. This step in <strong>not</strong> optional. It will not work if you skip this step.</li>
<li>Now type <strong>exit</strong> and hit enter, repeat if you aren't out of adb shell yet</li>
<li>Type<strong> adb pull /data/data/com.android.providers.settings/databases/settings.db</strong> and hit enter
<ul>
<li>If you get an error saying "failed to copy '/data/data/com.android.providers.settings/databases/settings.db' to './settings.db': Permission denied", make sure that you remounted your filesystem in read-write mode. This could be the problem. If it still does not work after you make sure that you remounted your filesystem properly, try these steps which worked for me:
<ul>
<li>Go back into <strong>adb shell</strong></li>
<li>Type <strong>su </strong>and hit enter to get root access<strong><br />
</strong></li>
<li>Type, letter for letter, "<strong>cat /data/data/com.android.providers.settings/databases/settings.db &gt; /data/local/settings.db</strong>" and hit enter</li>
<li>Now type <strong>exit</strong> twice to get out of adb shell</li>
<li>In your regular terminal (not adb shell) type "<strong>adb pull /data/local/settings.db</strong>" and hit enter.</li>
</ul>
</li>
</ul>
</li>
<li>Type <strong>sqlite3 settings.db </strong>and hit enter</li>
<li>Type (letter for letter) these lines, hitting enter after each one:</li>
</ul>
<pre>INSERT INTO gservices (name, value) VALUES ('sms_outgoing_check_max_count', 999999999);
INSERT INTO secure (name, value) VALUES ('sms_outgoing_check_max_count', 999999999);
INSERT INTO gservices (name, value) VALUES ('sms_outgoing_check_interval_ms', 0);
INSERT INTO secure (name, value) VALUES ('sms_outgoing_check_interval_ms', 0);
.quit</pre>
<ul>
<li>If you are on Android 2.2 or newer, it is <strong><em>perfectly normal</em></strong> to get "no such table" error messages when entering the gservices lines. Just ignore those. It will still work.</li>
<li>You should be out of the sqlite editor, and back to your shell.</li>
<li>Type <strong>adb push settings.db /data/local/</strong> and hit enter</li>
<li>Now, go back into <strong>adb shell</strong> (just type adb shell and hit enter)</li>
<li>Verify that you have a<em><strong> #</strong></em> in your shell(not a $), which means that you have root access.</li>
<li>If you do not have a # in your shell, try typing <strong>su</strong>...</li>
<li>Type <strong>cd /data/local</strong> to get to the directory where we just stored the modified settings database</li>
<li>type <strong>ls </strong>to list the files in the directory, and verify that <strong><em>settings.db</em></strong> is in the list of files</li>
<li>Now, letter for letter, type <span id=":kq"><strong>cat settings.db &gt; /data/data/com.android.providers.settings/databases/settings.db</strong> and hit enter</span></li>
<li><span id=":kq">Nothing should appear on the screen. This is perfectly fine.</span></li>
<li><span id=":kq">Now, let's verify that the file was written properly before rebooting the phone...</span></li>
<li><span id=":kq">Type </span><strong><span id=":fm">cmp -l /data/local/settings.db /data/data/com.android.providers.settings/databases/settings.db</span></strong></li>
<li><span id=":fm">Nothing should come up from that either. If something does, the database was <strong>not </strong>copied properly. Go back to the last <strong>cat </strong>command step. Otherwise, your database has been modified successfully. Congratulations!<br />
</span></li>
<li><span id=":fm">Now, exit the shell again, by typing <strong>exit</strong> and hitting enter until you are no longer in adb shell, just like last time.<br />
</span></li>
<li>The settings file should be updated on your device. This will not be applied until you reboot your device.</li>
<li>To reboot your phone, type <strong>adb reboot </strong>and hit enter.</li>
</ul>
<p><del>I haven't tried that method, since automatic removal works perfectly on  my <a class="zem_slink" title="Samsung i9000 Galaxy S" rel="wikipedia" href="http://en.wikipedia.org/wiki/Samsung_i9000_Galaxy_S">Samsung Epic 4G</a> running Android 2.1, but let me know if that works  for you by leaving a comment on this post, or by sending me an email</del>. This method has been updated, and it works <em>perfectly</em> on my Samsung Epic 4G running a leaked ROM of Android 2.2.</p>
<p><strong>UPDATE: </strong>I recently found out that WordPress changes certain characters slightly, which causes the <a class="zem_slink" title="SQLite" rel="wikipedia" href="http://en.wikipedia.org/wiki/SQLite">SQLite</a> commands above to not work properly. The SQLite commands are now in <strong>&lt;pre&gt; </strong>tags to prevent this from happening. This may be the reason that manual removal failed before for some users. Also, rather than pushing the file directly to the settings database, the guide is updated to push it to <strong>/data/local/</strong> and overwrite it as root using <strong>cat</strong>.</p>
<p><strong>UPDATE 2 (10/21/2010):</strong> I successfully got this working on someone's phone, and they no longer have a sending limit (verified)! Special thanks to Jacob Miller for helping me out and for his patience while we tried commands on his Droid (Original), until we eventually got it working! :) This guide has been updated to reflect the changes in the process that were necessary in order to get it to work.</p>
<p><strong>UPDATE 3 (11/12/2010):</strong> On my Epic 4G running the leaked Android 2.2 Froyo ROM, I was unable to pull the settings.db file directly. I updated the instructions to include a workaround that worked for me.</p>
<p><strong>NOTE: </strong>I have tested this method on the Android 2.2 emulator three different times, and it worked each one. I want to automate the process on actual, rooted devices, but at the moment, it only works on 2.1 unfortunately.</p>
<div id="_mcePaste" class="mcePaste" style="position:absolute;left:-10000px;top:544px;width:1px;height:1px;overflow:hidden;"><strong>adb push settings.db /data/data/com.android.providers.settings/databases/settings.db</strong></div>
