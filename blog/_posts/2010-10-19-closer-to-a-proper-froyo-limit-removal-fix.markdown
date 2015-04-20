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
categories:
- Android
- EliteBomb Plus
- My Applications
- Tutorials
- Android Applications
- EliteBomb
- InfiniteSMS
tags:
- Android
- Android 2.2
- Google
- Jacob Miller
- root
- Samsung
- Samsung i9000 Galaxy S
- Short Messaging Service
- SMS
- Telecommunications
- Wireless Data
- cmp
- sqlite editor
- USB port Make
comments:
- id: 35
  author: Successful Android 2.2 SMS Limit Removal! &laquo; Dylan Taylor&#039;s Personal
    Blog
  author_email: ''
  author_url: http://www.dylanmtaylor.com/2010/10/21/successful-android-2-2-sms-limit-removal/
  date: '2010-10-21 23:50:56 +0000'
  date_gmt: '2010-10-21 23:50:56 +0000'
  content: '[...] the time with me in the chat in order to get the limit removed on
    his phone. The process on the post that describes how to remove the SMS sending
    manually has been updated to reflect what we had to do in order to get it to work.
    If you have a rooted [...]'
- id: 36
  author: DancinDirk
  author_email: dancindirk@gmail.com
  author_url: http://AtlantaBarStarz.com
  date: '2010-10-27 01:03:50 +0000'
  date_gmt: '2010-10-27 01:03:50 +0000'
  content: Ok, I can confirm the instructions listed on the blog did work on my evo
    running the latest EViO Rom! Whoo Hoo!
- id: 37
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: http://www.dylanmtaylor.com/
  date: '2010-10-28 22:40:14 +0000'
  date_gmt: '2010-10-28 22:40:14 +0000'
  content: Congratulations! Thanks for letting me know! :)
- id: 38
  author: Metak
  author_email: Muhamedgusic@gmail.com
  author_url: ''
  date: '2010-10-31 17:12:15 +0000'
  date_gmt: '2010-10-31 17:12:15 +0000'
  content: dancin dirk, can you help me do the same?
- id: 39
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: http://www.dylanmtaylor.com/
  date: '2010-10-31 17:43:35 +0000'
  date_gmt: '2010-10-31 17:43:35 +0000'
  content: What can't you get Metak? I recently added instructions on how to put the
    phone into development mode, based on a question I got as an email. If you have
    any trouble, please let me know. Thanks!
- id: 40
  author: DancinDirk
  author_email: dancindirk@gmail.com
  author_url: http://AtlantaBarStarz.com
  date: '2010-11-10 00:08:46 +0000'
  date_gmt: '2010-11-10 00:08:46 +0000'
  content: |-
    Here's the shortened version. it's exactly as above without the explanations


    Run adb shell
    Type su and hit enter
    Type remount rw and hit enter.
    Now type exit and hit enter, repeat if you aren&acirc;&euro;&trade;t out of adb shell yet
    Type adb pull &#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db and hit enter
    Type sqlite3 settings.db and hit enter
    Type:
    INSERT INTO secure (name, value) VALUES ('sms_outgoing_check_max_count', 999999999);
    INSERT INTO secure (name, value) VALUES ('sms_outgoing_check_interval_ms', 0);
    .quit
    Type adb push settings.db &#47;data&#47;local&#47; and hit enter
    adb shell
    Type cd &#47;data&#47;local to get to the directory where we just stored the modified settings database
    type ls to list the files in the directory, and verify that settings.db is in the list of files
    Now, letter for letter, type cat settings.db > &#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db and hit enter
    Type cmp -l &#47;data&#47;local&#47;settings.db &#47;data&#47;data&#47;com.android.providers.settings&#47;databases&#47;settings.db
    Nothing should come up from that either. If something does, the database was not copied properly. Go back to the last cat command step.
    type exit
    type adb reboot and hit enter.
- id: 41
  author: Vita
  author_email: trademe0@hotmail.com
  author_url: ''
  date: '2010-11-12 07:28:43 +0000'
  date_gmt: '2010-11-12 07:28:43 +0000'
  content: I am really quite new to this and can not quite grasp this process - is
    there an eta for the auto app or a more basic step by step tutorial? (have brought
    the elite bomber pro)
- id: 42
  author: Vita
  author_email: trademe0@hotmail.com
  author_url: ''
  date: '2010-11-12 08:19:32 +0000'
  date_gmt: '2010-11-12 08:19:32 +0000'
  content: |-
    I cant even get passed superuser command - am i missing something here? rooted with superoneclick 1.5.5

    <code>
    C:\android-sdk-windows\tools>adb devices
    List of devices attached
    308730FC57E5    device


    C:\android-sdk-windows\tools>adb shell
    $ su
    su
    Permission denied
    $ exit
    exit

    C:\android-sdk-windows\tools>
    <&#47;code>
- id: 43
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: http://www.dylanmtaylor.com/
  date: '2010-11-13 03:29:38 +0000'
  date_gmt: '2010-11-13 03:29:38 +0000'
  content: Working on fixing automatic limit removal for Froyo devices right now,
    since I have the leaked epic 4g ROM, will hopefully have fix out soon!
- id: 44
  author: Just Installed Leaked Epic 4G Froyo ROM &laquo; Dylan Taylor&#039;s Personal
    Blog
  author_email: ''
  author_url: http://www.dylanmtaylor.com/2010/11/12/just-installed-leaked-epic-4g-froyo-rom/
  date: '2010-11-13 03:47:18 +0000'
  date_gmt: '2010-11-13 03:47:18 +0000'
  content: '[...] The post describing how to manually remove the SMS sending limitations
    has been updated to fix a permission denied [...]'
- id: 45
  author: Vita
  author_email: trademe0@hotmail.com
  author_url: ''
  date: '2010-11-13 06:13:54 +0000'
  date_gmt: '2010-11-13 06:13:54 +0000'
  content: |-
    Got it going - did not realise the phone was coming up with SU permission request.

    remount rw did not work but
    mount -o remount,rw -t yaffs2 &#47;dev&#47;block&#47;mtdblock3 &#47;system   did
- id: 46
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: http://www.dylanmtaylor.com/
  date: '2010-11-13 19:35:52 +0000'
  date_gmt: '2010-11-13 19:35:52 +0000'
  content: Thanks for letting me know! :)
- id: 95
  author: cycycool
  author_email: cycycool@hotmail.com
  author_url: ''
  date: '2010-11-26 16:06:12 +0000'
  date_gmt: '2010-11-26 16:06:12 +0000'
  content: "i try it on samsung galaxy S froyo XXJPM \r\nno worked it \r\n&#47;dbdata&#47;databases&#47;com.android.providers.settings&#47;databases&#47;settings.db
    and secure.. by SQLITE\r\nand for Gservices is in com.google.android.gsf&#47;gservices.db\r\n\r\ndo
    you find it ? thank help me"
- id: 96
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: http://dylanmtaylor.com
  date: '2010-11-27 00:46:19 +0000'
  date_gmt: '2010-11-27 00:46:19 +0000'
  content: Automatic limit removal should work now on Android 2.2 devices. Try downloading
    the latest version of EliteBomb, and attempting to remove the limit using that.
- id: 98
  author: cycycool
  author_email: cycycool@hotmail.com
  author_url: ''
  date: '2010-11-29 00:31:38 +0000'
  date_gmt: '2010-11-29 00:31:38 +0000'
  content: "i have already installed elitebomb and infinite sms but limit removal
    is no worked (no reply) so my GS is rooted !!\r\n\r\nwhy ???"
- id: 99
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: ''
  date: '2010-11-29 06:22:06 +0000'
  date_gmt: '2010-11-29 06:22:06 +0000'
  content: I'm not sure why that wouldn't be working for you. Make sure you have the
    Superuser application installed, and that the file system is mounted in rw mode
    (the application remounts for you, but it may not be working). What phone are
    you on? I'm guessing that by GS, you are referring to the Galaxy S smartphone?
    I personally have an Epic 4G, a variation of the Galaxy S phone, and it works
    perfectly fine for me. I'm not sure why you would have any issues.
- id: 100
  author: cycycool
  author_email: cycycool@hotmail.com
  author_url: ''
  date: '2010-11-29 12:07:15 +0000'
  date_gmt: '2010-11-29 12:07:15 +0000'
  content: "yes i have already installed also Superuser but when i open the soft Infinite
    sms but superruser havnt show me as authorizes for Infinite sms !! \r\nwell i
    dont know about mounted or unmounted &#47;data, &#47;system ... ? \r\nso i must
    to make unmount &#47;data, &#47;system... ?\r\nor Mount as RW ? and how to mount
    as RW ? \r\nright Galaxy S \r\nthank !!"
- id: 225
  author: Shoaib
  author_email: mshoaib.akram@hotmail.com
  author_url: ''
  date: '2011-05-12 11:25:58 +0000'
  date_gmt: '2011-05-12 11:25:58 +0000'
  content: "I had to use Super One Click to get root access (wouldn't get other wise)\r\n\r\nThen
    I followed this process step by step on my Huawei IDEOS u8150\r\n\r\nSuccess!!!\r\n\r\nThanks
    dylan, may you get eman!! :-)"
- id: 408
  author: gaschamber
  author_email: gaschamber@yahoo.com
  author_url: ''
  date: '2011-11-08 02:00:49 +0000'
  date_gmt: '2011-11-08 02:00:49 +0000'
  content: "i know this topic has'nt been updated for a long time but its the only
    search hit i got which claimed to have sucessfully removed the sms limit on an
    android 2.2. \r\n\r\ni noticed the procedure seems to need a PC to run those commands.
    how about instructions for those with terminal emulators (like the terminal emulator
    system app or better terminal emulator downloaded from the market) in their devices
    only. i admit the procedure above is too complicated for \"non developer&#47;gurus\"
    like me. thanks to those who'd help!"
- id: 45045
  author: Shasta
  author_email: shastamitchell@gmail.com
  author_url: ''
  date: '2014-09-01 19:29:50 +0000'
  date_gmt: '2014-09-01 19:29:50 +0000'
  content: "I read a lot of interesting posts here. Probably you  \r\nspend a lot
    of time writing, i know how to save you a lot of time, there is an online \r\ntool
    that creates readable, SEO friendly articles in seconds, just search in google
    \ - \r\nlaranitas free content source\r\n\r\nAlso visit my weblog; <a href=\"http:&#47;&#47;Bill.blogspot.com\"
    rel=\"nofollow\">Anitra<&#47;a>"
- id: 46679
  author: fifa 15 ultimate team coins
  author_email: Cheda891@aol.com
  author_url: http://www.apic-ak.cz/data/media/FIFA19.html
  date: '2014-09-25 23:28:11 +0000'
  date_gmt: '2014-09-25 23:28:11 +0000'
  content: As well as in this little existing tablet, Brevicon 1&#47;35 for more than
    each year. I started my best past frequent period at The spring of 4, 2010, in
    the future very early just as my best 21 years of age time lively medicine stop
    over the Wednesday and i also begun blood loss over the Wednesday. My very own
    period of time has been regular. Following Chintan Shivir, any Jaipur commitment
    of any bash said, "the Indian State Institutions the first will always put together
    the capability of girls Personal growth Communities (SHGs). Indira Gandhi possessed
    started NABARD 30 years ago to help you induce farming along with country improvement.
    "The Institutions the first thinks that the next step is to ascertain a fanatical
    State Bank or investment company for women to deliver economical products and
    services to help you most women generally and women SHGs for example.Ins PTI AMR
    RAI.
- id: 50353
  author: Harvey Glicken
  author_email: Rykowski363@gmail.com
  author_url: ''
  date: '2014-10-21 23:14:42 +0000'
  date_gmt: '2014-10-21 23:14:42 +0000'
  content: "I used to be afraid to dive into php, but gave it a shot after reading
    this. Hardly ever really really like WordPress' comment system. Many thanks for
    your tips to get me started.\r\n\r\nhttp:&#47;&#47;www.VNc8DXdpZxVNc8DXdpZx.com&#47;VNc8DXdpZxVNc8DXdpZx"
- id: 52523
  author: best diet
  author_email: Skanes@gmail.com
  author_url: ''
  date: '2014-10-30 22:32:40 +0000'
  date_gmt: '2014-10-30 22:32:40 +0000'
  content: "Love this, I love the low carb diet but with IBS there are several low
    carb vegetables that don't agree with me. :(\r\n\r\nhttp:&#47;&#47;redd.it&#47;2izjwm"
- id: 53242
  author: Mathilda Erskine
  author_email: Schwarts100@gmail.com
  author_url: ''
  date: '2014-11-01 08:40:31 +0000'
  date_gmt: '2014-11-01 08:40:31 +0000'
  content: "First time visit here and have your wonderful post. May We have a copy
    of the article?\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 53578
  author: Loren Jollimore
  author_email: Pachter358@gmail.com
  author_url: ''
  date: '2014-11-02 12:48:10 +0000'
  date_gmt: '2014-11-02 12:48:10 +0000'
  content: "My dream would not be just one particular place. Just having the money
    and ability to travel and see it all.\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 53979
  author: prostatitis cure
  author_email: Spiva20@gmail.com
  author_url: http://www.prostatitis3d-cure.com
  date: '2014-11-03 22:25:50 +0000'
  date_gmt: '2014-11-03 22:25:50 +0000'
  content: Please let me know if you're looking for a author for your blog. You have
    some really great posts and I feel I would be a good asset. If you ever want to
    take some of the load off, I'd love to write some articles for your blog in exchange
    for a link back to mine. Please send me an e-mail if interested. Cheers!
- id: 54159
  author: Bamboo Plants
  author_email: Maio@aol.com
  author_url: http://arizonagrandmeetings.com/tag/change-hydroponic-systems
  date: '2014-11-04 10:01:23 +0000'
  date_gmt: '2014-11-04 10:01:23 +0000'
  content: Wow! This can be one particular of the most helpful blogs We have ever
    arrive across on this subject. Basically Fantastic. I am also an expert in this
    topic so I can understand your effort.
- id: 54215
  author: Belinda Posa
  author_email: 63Mongillo@hotmail.com
  author_url: http://www.uship.com/au/car-transport/
  date: '2014-11-04 12:49:10 +0000'
  date_gmt: '2014-11-04 12:49:10 +0000'
  content: tten, will help you decide if it's the right choice for you.
- id: 55692
  author: Comprehension
  author_email: Strini@rocketmail.com
  author_url: http://mysandiegoair.com/tag/esl
  date: '2014-11-10 13:27:40 +0000'
  date_gmt: '2014-11-10 13:27:40 +0000'
  content: Simply  wanna  state  that this is  invaluable , Thanks for taking your
    time to write this.
- id: 56218
  author: Internet Radio
  author_email: Patadia@gmail.com
  author_url: http://inblfnetwork.com/tag/dars
  date: '2014-11-12 07:54:45 +0000'
  date_gmt: '2014-11-12 07:54:45 +0000'
  content: It is really a great and useful piece of info. I'm glad that you shared
    this useful info with us. Please keep us up to date like this. Thanks for sharing.
- id: 57839
  author: Electric Bike
  author_email: Kilkus3550@yahoo.com
  author_url: http://acumenprojectanalyzer.com/tag/scooters
  date: '2014-11-15 22:34:44 +0000'
  date_gmt: '2014-11-15 22:34:44 +0000'
  content: Generally I don't learn article on blogs, but I would like to say that
    this write-up very compelled me to try and do so! Your writing taste has been
    amazed me. Thank you, quite great article.
- id: 58519
  author: Ray
  author_email: ''
  author_url: http://%/hhffhb9865
  date: '2014-11-17 18:52:55 +0000'
  date_gmt: '2014-11-17 18:52:55 +0000'
  content: |-
    <strong><a href="http:&#47;&#47;gov.albumroad.ru&#47;?p=44&amp;lol= navigable@taxied.authenticator" rel="nofollow">.<&#47;a><&#47;strong>

    hello.
- id: 58929
  author: Bennett Weghorst
  author_email: Chadbourne390@gmail.com
  author_url: ''
  date: '2014-11-18 09:23:38 +0000'
  date_gmt: '2014-11-18 09:23:38 +0000'
  content: "attractive inspiring collection.attractive created designs here!Many thanks
    for sharing.\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 59177
  author: Darleen Sondrini
  author_email: Weingart206@gmail.com
  author_url: ''
  date: '2014-11-18 19:25:31 +0000'
  date_gmt: '2014-11-18 19:25:31 +0000'
  content: "it will not totally remove the plugin....\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 59194
  author: nathan
  author_email: ''
  author_url: http://%/iedhgdce73
  date: '2014-11-18 20:03:52 +0000'
  date_gmt: '2014-11-18 20:03:52 +0000'
  content: |-
    <strong><a href="http:&#47;&#47;coosies.poiskmogil.ru&#47;?p=22&amp;lol= separable@easements.lion" rel="nofollow">.<&#47;a><&#47;strong>

    &Atilde;&plusmn;&Atilde;&macr;&Atilde;&plusmn;.
- id: 59293
  author: Leo
  author_email: ''
  author_url: http://%/jdgacjhib006
  date: '2014-11-19 00:47:23 +0000'
  date_gmt: '2014-11-19 00:47:23 +0000'
  content: |-
    <strong><a href="http:&#47;&#47;waldorf.songbit.ru&#47;?p=9&amp;lol= merger@urethanes.trackless" rel="nofollow">.<&#47;a><&#47;strong>

    &Atilde;&plusmn;&Atilde;&frac12;&Atilde;&shy;&Atilde;&ordf;&Atilde;&plusmn; &Atilde;&sect;&Atilde;&nbsp; &Atilde;&uml;&Atilde;&shy;&Atilde;&acute;&Atilde;&sup3;!
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
