---
layout: post
status: publish
published: true
title: Finally, a New Version of Skype for Linux!
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 1021
wordpress_url: http://dylanmtaylor.com/?p=1021
date: '2011-04-08 00:35:03 +0000'
date_gmt: '2011-04-08 00:35:03 +0000'
categories:
- News
- Skype
tags: []
comments:
- id: 183
  author: Mike
  author_email: mbillings17@gmail.com
  author_url: ''
  date: '2011-04-08 03:19:01 +0000'
  date_gmt: '2011-04-08 03:19:01 +0000'
  content: "Hi Dylan,\r\n\r\nSorry this isn't in the right place, I couldn't find
    a way to contact you on your website.  I'm developing an Android application for
    a company and it needs to send and receive a lot of SMS messages.  The first problem
    I ran into is is 100 texts per hour limit, and I was able to find an APK for infiniteSMS
    within your comments.  I haven't rooted the phone yet to install it, but I imagine
    it's going to solve that problem.\r\n\r\nI'm wondering if you think there are
    any other issues I may run into from sending a high volume of SMS messages?  Right
    now, I'm sending each individual message as it's own AsyncTask.  I'm thinking
    that it might be a good idea to introduce a delay between creating each SMS, is
    this something you ever had to do for EliteBomb?\r\n\r\nAny insight you have is
    greatly appreciated.  Unfortunately it's hard for me to test a high volume of
    messages without going live, and I want to be prepared for any problems that might
    arise.\r\n\r\nThanks in advance,\r\nMike"
- id: 184
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: ''
  date: '2011-04-09 03:36:11 +0000'
  date_gmt: '2011-04-09 03:36:11 +0000'
  content: Mike -- I haven't even touched the EliteBomb source code since I got banned
    from the market, and I can't remember exactly how I coded it, but in EliteBomb,
    the user could select a delay between sending the messages. Without rapid fire
    mode on, I would wait until the previous message was sent using BroadcastReceivers
    (which I unregistered upon receiving a result), and sending the messages in a
    custom class that extends Thread called SendMessageThread which could be interrupted
    and cancelled by clicking the "Cancel" button. I believe I also used a Handler
    to communicate between threads. Without a delay, on my phone, a Samsung Epic 4G,
    running in "rapid fire" mode, on a 'victim' who agreed to be text bombed (my brother),
    the phone was able to queue in excess of 1500 messages before becoming sluggish.
    If you are sending at least a thousand messages, I recommend adding a slight delay.
    Really, how many messages you can queue without a delay depends on the phone that's
    being used to send the messages.
- id: 187
  author: Mike
  author_email: mbillings17@gmail.com
  author_url: ''
  date: '2011-04-09 19:51:45 +0000'
  date_gmt: '2011-04-09 19:51:45 +0000'
  content: "Dylan - Thanks so much for the information.\r\n\r\nI just want to make
    sure I understand Rapid Fire mode completely.  In this mode, was each message
    still on its own thread, but without waiting for the previous message to complete?
    \ If so, it's sounds nearly equivalent to my approach with AsyncTasks.\r\n\r\nA
    big part of my concern was possibly creating too many threads, but if you were
    able to make 1500 one after another without any sort of delay then I have nothing
    to worry about.  Initially I think I'll be sending about 20 messages at a time
    in bursts every 5 seconds, and it sounds like I can handle a lot more.\r\n\r\nWere
    there ever any stories of carriers stopping delivery?\r\n\r\nThanks again."
- id: 188
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: ''
  date: '2011-04-12 02:17:34 +0000'
  date_gmt: '2011-04-12 02:17:34 +0000'
  content: Because the actual operating system itself handles queuing and sending
    the messages, I believe I didn't need to have a thread for each message, as then
    OS handled that for me. I believe I just use a while loop in my message sending
    thread,  checking if the sending process was still running (not adding BroadcastReceivers
    in rapid fire mode), and queuing a large amount of messages. I don't think I'm
    going to give out any of the code, as it can be used for very malicious purposes
    with a couple of modifications, but I can tell you I had a delay of 50ms, even
    with rapid fire. The reason it was so much faster is because it didn't wait for
    the actual message to send. As far as I know, I haven't heard of any carriers
    stopping delivery, and that's considering the fact that EliteBomb has been used
    to send _massive_ quantities of messages at once.
- id: 8296
  author: federal health insurance
  author_email: jorgebriones@gmail.com
  author_url: http://journals.fotki.com/alvarezvopk/my-blog/entry/ktkfqgfkwwrb/
  date: '2013-07-17 12:32:29 +0000'
  date_gmt: '2013-07-17 12:32:29 +0000'
  content: "I'm not sure where you are getting your information, but good topic. I
    needs to spend some time learning much more or understanding more. Thanks for
    fantastic info I was looking for this info for my mission.\r\n\r\nFeel free to
    visit my page; <a href=\"http:&#47;&#47;journals.fotki.com&#47;alvarezvopk&#47;my-blog&#47;entry&#47;ktkfqgfkwwrb&#47;\"
    rel=\"nofollow\">federal health insurance<&#47;a>"
- id: 46652
  author: fifa 15 coins
  author_email: Landolt1416@aol.com
  author_url: http://www.donald-bren.com/FIFA42.html
  date: '2014-09-25 22:27:38 +0000'
  date_gmt: '2014-09-25 22:27:38 +0000'
  content: On the other hand, A radioactive compound was ever coursing being a their
    health coming to receptors within his or her thought processes tissues. A sound
    fulblessed the bedroom once equally the world slid about a doughnut formed gap
    through a chemistry of the mental performance reader. In the event that ones verification
    experienced after that looked into, Pink and light green strips been seen intense
    to their minds, Producing affect..
- id: 46710
  author: fifa 15 ultimate team coins
  author_email: Schons1940@aol.com
  author_url: http://medsys.be/images/assets/FIFA39.html
  date: '2014-09-26 00:34:04 +0000'
  date_gmt: '2014-09-26 00:34:04 +0000'
  content: stylish, easy and restrained
- id: 50682
  author: Dave Agosto
  author_email: Weishar318@gmail.com
  author_url: ''
  date: '2014-10-23 08:49:39 +0000'
  date_gmt: '2014-10-23 08:49:39 +0000'
  content: "Not clear on what you might have in mind, Laila. Can you give us some
    more information?\r\n\r\nhttp:&#47;&#47;www.VNc8DXdpZxVNc8DXdpZx.com&#47;VNc8DXdpZxVNc8DXdpZx"
- id: 52420
  author: Online Schools
  author_email: Hoffmeyer@aol.com
  author_url: http://jumprighton.com/online-degrees-suggest-easier.html
  date: '2014-10-30 18:27:02 +0000'
  date_gmt: '2014-10-30 18:27:02 +0000'
  content: Wonderful web site. Plenty of useful information here. I'm sending it to
    a few friends ans additionally sharing in delicious. And obviously, thank you
    on your sweat!
- id: 53256
  author: Maribel Stoudmire
  author_email: Strickling396@gmail.com
  author_url: ''
  date: '2014-11-01 09:52:26 +0000'
  date_gmt: '2014-11-01 09:52:26 +0000'
  content: "Wonderful article, definitely regret not planning to the USO style dinner.
    Keep up the good perform!\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 53258
  author: Nutrition Facts
  author_email: Mickenheim@aol.com
  author_url: http://cavebedandbreakfast.com/protein-shakes-worth.html
  date: '2014-11-01 10:01:49 +0000'
  date_gmt: '2014-11-01 10:01:49 +0000'
  content: You really make it seem so easy with your presentation but I find this
    matter to be actually something that I think I would never understand. It seems
    too complicated and extremely broad for me. I'm looking forward for your next
    post, I&acirc;&euro;&trade;ll try to get the hang of it!
- id: 53754
  author: Teeth Whitening
  author_email: Gurganus@hotmail.com
  author_url: http://scottsdaletosedona.com/tag/colgate-seen-white
  date: '2014-11-03 04:18:41 +0000'
  date_gmt: '2014-11-03 04:18:41 +0000'
  content: We are a group of volunteers and starting a new scheme in our community.
    Your site offered us with valuable information to work on. You've done an impressive
    job and our whole community will be grateful to you.
- id: 54140
  author: Tesha Funai
  author_email: 50Drue@hotmail.com
  author_url: http://www.uship.com/au/car-transport/
  date: '2014-11-04 09:13:56 +0000'
  date_gmt: '2014-11-04 09:13:56 +0000'
  content: tten, will help you decide if it's the right choice for you.
- id: 54357
  author: Led Grow Lights
  author_email: Scrivens247@aol.com
  author_url: http://arizonagrandmeetings.com/page/2
  date: '2014-11-05 01:26:07 +0000'
  date_gmt: '2014-11-05 01:26:07 +0000'
  content: "Hi, i think that i saw you visited my website so i came to &acirc;&euro;&oelig;return
    the favor&acirc;&euro;\x9D.I am attempting to find things to improve my website!I
    suppose its ok to use some of your ideas!!"
- id: 54668
  author: Houses For Rent
  author_email: Knutzen3892@hotmail.com
  author_url: http://endurabrand.com/tag/property-management
  date: '2014-11-06 07:58:18 +0000'
  date_gmt: '2014-11-06 07:58:18 +0000'
  content: Wow! This could be one particular of the most helpful blogs We have ever
    arrive across on this subject. Actually Fantastic. I am also an expert in this
    topic so I can understand your hard work.
- id: 55096
  author: Mariano Heebner
  author_email: Walderon230@gmail.com
  author_url: ''
  date: '2014-11-07 19:22:38 +0000'
  date_gmt: '2014-11-07 19:22:38 +0000'
  content: "Ditto to Ginny re: posting the earlier letters for new subscribers. Alsocan
    you inform us who wrote the January letters?\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 55098
  author: Olen
  author_email: olenmcbrien@gmail.com
  author_url: ''
  date: '2014-11-07 19:33:11 +0000'
  date_gmt: '2014-11-07 19:33:11 +0000'
  content: "See, most porn addicts try tons of different things they 'think' will
    \r\nwork or simply something that was told by such and such person. \r\nHis relationships
    with children buttress the pedophile's \r\ntwin grandiose delusions of omnipotence
    and omniscience.\r\n\r\nBy interacting with these intermittent, unpredictable,
    ultimately unknowable, ephemeral, and ethereal voices \r\n&ndash; the narcissist
    is compelled to project unto them his \r\nown experiences, fears, hopes, and prejudices.\r\n\r\nMy
    web site ... <a href=\"http:&#47;&#47;www.board.broatcast.de&#47;user-39004.html\"
    rel=\"nofollow\">sex on the beach at south padre island<&#47;a>"
- id: 55676
  author: Literacy
  author_email: Orea@ymail.com
  author_url: http://mysandiegoair.com/tag/language
  date: '2014-11-10 11:40:30 +0000'
  date_gmt: '2014-11-10 11:40:30 +0000'
  content: I&acirc;&euro;&trade;m not sure where you are getting your info, but great
    topic. I needs to spend some time learning much more or understanding more. Thanks
    for excellent information I was looking for this information for my mission.
- id: 56206
  author: Radio Stations
  author_email: Weagraff@hotmail.com
  author_url: http://inblfnetwork.com/satellite-phone-service-glance-anticipate.html
  date: '2014-11-12 06:19:10 +0000'
  date_gmt: '2014-11-12 06:19:10 +0000'
  content: Hello There. I found your blog using msn. This is an extremely well written
    article. I will make sure to bookmark it and return to read more of your useful
    information. Thanks for the post. I&acirc;&euro;&trade;ll certainly return.
- id: 58330
  author: Camping Gear
  author_email: Minturn@hotmail.com
  author_url: http://nyymcacamp.com/tag/lustrous-camping
  date: '2014-11-17 06:57:20 +0000'
  date_gmt: '2014-11-17 06:57:20 +0000'
  content: Hi my family member! I want to say that this post is awesome, nice written
    and include almost all vital infos. I would like to look more posts like this.
- id: 58786
  author: Jaleesa Gorychka
  author_email: Kwit420@gmail.com
  author_url: ''
  date: '2014-11-18 04:25:33 +0000'
  date_gmt: '2014-11-18 04:25:33 +0000'
  content: "My dream retirement is living on a 45ft center cockpit Hunter sailboat
    with my man and dog sailing the inter coastal waterways, the Caribbean, and any
    port I choose.\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 58863
  author: Ricardo
  author_email: ''
  author_url: http://%/dbefehaa361
  date: '2014-11-18 07:16:41 +0000'
  date_gmt: '2014-11-18 07:16:41 +0000'
  content: |-
    <strong><a href="http:&#47;&#47;cn.mp3partner.ru&#47;?p=19&amp;lol= terrace@magoun.mclish" rel="nofollow">.<&#47;a><&#47;strong>

    &Atilde;&iexcl;&Atilde;&laquo;&Atilde;&nbsp;&Atilde;&pound;&Atilde;&reg;&Atilde;&curren;&Atilde;&nbsp;&Atilde;&deg;&Atilde;&yen;&Atilde;&shy;!!
- id: 59451
  author: julius
  author_email: ''
  author_url: http://%/cdbaaifb9
  date: '2014-11-19 06:50:01 +0000'
  date_gmt: '2014-11-19 06:50:01 +0000'
  content: |-
    <strong><a href="http:&#47;&#47;cat.songdog.ru&#47;?p=6&amp;lol= myn@bibliographical.ky" rel="nofollow">.<&#47;a><&#47;strong>

    good!!
- id: 59483
  author: Ollie Schoeninger
  author_email: Zeyer238@gmail.com
  author_url: ''
  date: '2014-11-19 08:03:13 +0000'
  date_gmt: '2014-11-19 08:03:13 +0000'
  content: "A person necessarily lend a hand to make seriously content articles I'd
    state. That is certainly the pretty first time I frequented your internet webpage
    and thus far? I amazed along with the research you made to make this actual post
    extraordinary. Excellent activity!\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
---
<p style="text-align: left;"><img class="aligncenter" title="Skype for Linux 2.2" src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;04&#47;skype-for-linux4.jpg" alt="" width="600" height="207" &#47;> After approximately 15 months of waiting, Skype <em>finally<&#47;em> decided to release a new version of their software for the Linux operating system. I haven't tested the new version quite yet, but I know for sure that the old version was incredibly buggy, it always froze, and it was full of irritating bugs. Hopefully this new release of Skype will at least bring the Linux version of Skype a little bit closer to the version of Skype for the Microsoft Windows platform. Anyways, I'm going to go ahead and download the new version of Skype and try it out right now, and I'll probably update this post with my opinions on the update.<&#47;p><br />
via <a href="http:&#47;&#47;downloadsquad.switched.com&#47;2011&#47;04&#47;07&#47;skype-for-linux-gets-an-update-after-almost-15-months&#47;">Switched<&#47;a></p>
