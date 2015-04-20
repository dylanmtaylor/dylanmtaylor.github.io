---
layout: post
status: publish
published: true
title: LibreScribe Progress Update
author:
  display_name: Dylan Taylor
  login: aliendude5300
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: aliendude5300
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 1031
wordpress_url: http://dylanmtaylor.com/?p=1031
date: '2011-05-21 06:59:38 +0000'
date_gmt: '2011-05-21 06:59:38 +0000'
categories:
- Linux
- My Applications
- News
- Open Source
- Programming
- Updates
- C++ Applications
- LibreScribe
tags: []
comments:
- id: 249
  author: Aldi
  author_email: ss@ss.sw
  author_url: ''
  date: '2011-06-01 20:49:55 +0000'
  date_gmt: '2011-06-01 20:49:55 +0000'
  content: Dear Dylan, thanks a lot for your continuing effort on LibreScribe! It
    is a great project.
- id: 303
  author: Gerry
  author_email: gerry.treppel@googlemail.com
  author_url: ''
  date: '2011-08-01 20:26:09 +0000'
  date_gmt: '2011-08-01 20:26:09 +0000'
  content: Hi Dylan, thanks for your LibreScribe project! Do you have plans to continue
    the project? It would be great to use the LiveScribe pens in Linux. Thanks so
    much, Gerry.
- id: 360
  author: Stephan Gromer
  author_email: stephan@gromer-online.de
  author_url: ''
  date: '2011-08-30 20:42:57 +0000'
  date_gmt: '2011-08-30 20:42:57 +0000'
  content: "Hey!\r\nThank you for your efforts to get this very usefull gadget working
    under Linux.\r\nUnfortunately I wasn't successful using my Echo 8 MB\r\nMaybe
    this information will help you to include it?\r\n\r\n\r\n[ 9136.153797] usb 2-1.4:
    new high speed USB device using ehci_hcd and address 7\r\n[ 9136.268048] input:
    Livescribe Echo(TM) Smartpen as &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;input&#47;input9\r\n[
    9136.268242] generic-usb 0003:1CFB:1032.0006: input,hidraw5: USB HID v1.11 Mouse
    [Livescribe Echo(TM) Smartpen] on usb-0000:00:1d.0-1.4&#47;input0\r\nsgromer@MasterMerlinux
    ~&#47;LibreScribe&#47;bin&#47;Release $ sudo lsusb\r\nBus 002 Device 007: ID 1cfb:1032
    \ \r\n\r\nAnything else you may need?"
- id: 363
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: ''
  date: '2011-09-02 22:18:25 +0000'
  date_gmt: '2011-09-02 22:18:25 +0000'
  content: Try again with the latest version.
- id: 367
  author: Stephan Gromer
  author_email: stephan@gromer-online.de
  author_url: ''
  date: '2011-09-04 21:50:51 +0000'
  date_gmt: '2011-09-04 21:50:51 +0000'
  content: "I followed the \"howto\" on https:&#47;&#47;github.com&#47;aliendude5300&#47;LibreScribe&#47;wiki\r\nafter
    the git command I just issued \"make\" and then went to the ~&#47;bin directory
    and started LibreScribe\r\nIt didn't work so I started the Debug-Version:\r\n~&#47;LibreScribe&#47;bin&#47;Debug
    $ .&#47;LibreScribe \r\nLibreScribe Alpha version 0.04, written by Dylan Taylor\r\nSearching
    for your Smartpen... Starting background monitor...\r\n\r\nentering findSmartpen()\r\n\r\nexiting
    findSmartpen() returning NULL\r\nSorry! No compatible smartpen device found!\r\ncan't
    retrieve changelist. no device_handle set. perhaps a device isn't connected?\r\nParsing
    audio list...\r\n(Now I added the Echo 8MB)\r\n\r\nudev device action detected:
    add; refreshing device state...\r\nSearching for your Smartpen... \r\nentering
    findSmartpen()\r\n\r\nexiting findSmartpen() returning device\r\nLiveScribe Echo(TM)
    Smartpen Detected!\r\nassigning device_handle.\r\nNo such device\r\ndevice_handle
    assignment failure.\r\ncan't retrieve changelist. no device_handle set. perhaps
    a device isn't connected?\r\nParsing audio list...\r\nDone refreshing device state.\r\n\r\n\r\nThis
    is what udevadm monitor tells me:\r\nKERNEL[1315173011.066312] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4
    (usb)\r\nKERNEL[1315173011.066978] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0
    (usb)\r\nKERNEL[1315173011.067017] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;0003:1CFB:1032.0008
    (hid)\r\nKERNEL[1315173011.068839] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;input&#47;input11
    (input)\r\nKERNEL[1315173011.068865] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;input&#47;input11&#47;mouse3
    (input)\r\nKERNEL[1315173011.068881] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;input&#47;input11&#47;event9
    (input)\r\nKERNEL[1315173011.068896] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;0003:1CFB:1032.0008&#47;hidraw&#47;hidraw5
    (hidraw)\r\nKERNEL[1315173011.069016] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.1
    (usb)\r\nKERNEL[1315173011.069044] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.2
    (usb)\r\nKERNEL[1315173011.069063] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.3
    (usb)\r\nUDEV  [1315173011.070080] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4
    (usb)\r\nUDEV  [1315173011.071611] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0
    (usb)\r\nUDEV  [1315173011.072430] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;0003:1CFB:1032.0008
    (hid)\r\nUDEV  [1315173011.072935] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.2
    (usb)\r\nUDEV  [1315173011.072975] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.1
    (usb)\r\nUDEV  [1315173011.073264] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;0003:1CFB:1032.0008&#47;hidraw&#47;hidraw5
    (hidraw)\r\nUDEV  [1315173011.074208] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.3
    (usb)\r\nUDEV  [1315173011.074478] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;input&#47;input11
    (input)\r\nUDEV  [1315173011.079807] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;input&#47;input11&#47;mouse3
    (input)\r\nUDEV  [1315173011.080040] add      &#47;devices&#47;pci0000:00&#47;0000:00:1d.0&#47;usb2&#47;2-1&#47;2-1.4&#47;2-1.4:1.0&#47;input&#47;input11&#47;event9
    (input)\r\n\r\n\r\nAm I doing something wrong?"
- id: 372
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: ''
  date: '2011-09-05 03:01:33 +0000'
  date_gmt: '2011-09-05 03:01:33 +0000'
  content: It should be working. Unfortunately I have a Pulse smartpen, and I'd rather
    not spend $100 on an Echo smartpen right now. I did notice that you plugged the
    pen in after the application started, instead of before starting it. That's perfectly
    fine. It literally doesn't make a difference at all. It should still be able to
    detect and use the smartpen either way. I want to make LibreScribe work with all
    LiveScribe devices, but without access to an Echo smartpen, it's significantly
    harder to do, unfortunately. I'd assume that the two versions are more or less
    the same except for the physical form of the product, and the device's storage
    capacity. I'll keep trying to get the Echo pens to work.
- id: 373
  author: Dylan Taylor
  author_email: aliendude5300@gmail.com
  author_url: ''
  date: '2011-09-05 03:23:10 +0000'
  date_gmt: '2011-09-05 03:23:10 +0000'
  content: I just looked into it, although I probably can't fix it right now, I'm
    99.9% sure that the problem is in the smartpen_connect function in src&#47;Smartpen.cpp,
    which starts on line 135 (in the latest commit). The function is returning a null
    value, even though the device seems to be present (the code in doRefreshDeviceState
    in GUIFrame.cpp is _clearly_ detecting it, since your output says "LiveScribe
    Echo(TM) Smartpen Detected!"). There are several ways this can happen, but I'll
    have to look into the matter further to determine why.
- id: 45560
  author: Kraig Robley
  author_email: Oyola134@gmail.com
  author_url: http://ethanh30f.page.tl/Where-Can-You-Get-Raspberry-Ketones.htm
  date: '2014-09-10 06:41:49 +0000'
  date_gmt: '2014-09-10 06:41:49 +0000'
  content: Very nice post. I just stumbled upon your blog and wished to say that I
    have really enjoyed surfing around your blog posts. After all I will be subscribing
    to your rss feed and I hope you write again soon!
- id: 45796
  author: vivienne westwood earring sale
  author_email: nkqjoomcdlg@gmail.com
  author_url: ''
  date: '2014-09-13 12:52:07 +0000'
  date_gmt: '2014-09-13 12:52:07 +0000'
  content: "In addition to the foreign trade enterprises, some due to factors such
    as designer fame formed a certain well-known Qingdao garment enterprises will
    also turn their attention to e-commerce, to a Qingdao China Garments CoVivienne
    Westwood UK, LtdVivienne Westwood UK is one of themVivienne Westwood UK But in
    the process of the specific operating e-commerce mode, this enterprise has experienced
    \"growing pains\" to reverse the market positioningVivienne Westwood UK\r\nvivienne
    westwood earring sale http:&#47;&#47;www.colecovision.dk&#47;images&#47;vivienne-westwood-earring-sale.html"
- id: 45797
  author: vivienne westwood bags sale
  author_email: kfswxg@gmail.com
  author_url: ''
  date: '2014-09-13 13:08:04 +0000'
  date_gmt: '2014-09-13 13:08:04 +0000'
  content: "This season Vivienne Westwood and Melissa have once again teamed up to
    produce yet another range of footwear, with everything from sling back heels,
    to flat pumps to ankle boots. Designs vary from stylish buttons, to glitter, to
    such cute designs as wax seals, cherries, and hearts on toes of shoes.In a twist
    that sets them aside from other brands, Vivienne Westwood Melissa shoes are made
    entirely from PVC. In beautiful colours, often cute pastels, the shoes really
    stand out and give a really girly look. There are even several styles for children.\r\nvivienne
    westwood bags sale http:&#47;&#47;illyriens.ows.fr&#47;blog&#47;vivienne-westwood-dress-sale.html"
- id: 45866
  author: mulberry alexa bag replica
  author_email: uuguzrxzgo@gmail.com
  author_url: ''
  date: '2014-09-14 18:36:22 +0000'
  date_gmt: '2014-09-14 18:36:22 +0000'
  content: "Tickets for the ego fashion auction are on sale now priced &Acirc;&pound;12,
    which includes wine and lunch. Tickets are available from ego in Chapelfield.\r\nmulberry
    alexa bag replica http:&#47;&#47;www.vanderkindere.com&#47;images&#47;mulberry-alexa-bag-sale.html"
- id: 45868
  author: Vivienne Westwood Giant Orb Bag
  author_email: gntazxgvsit@gmail.com
  author_url: ''
  date: '2014-09-14 19:08:58 +0000'
  date_gmt: '2014-09-14 19:08:58 +0000'
  content: "Her show was staged in a vast white pavilion built on the banks of the
    Seine, close by the Alexandre Trois bridge.In an impassioned note left on the
    seats, Dame Vivienne spoke of the importance of learning from the past, of respecting
    the planet, and securing the future.And, in a Paris season when both Nicolas Ghesqui&Atilde;&uml;re
    at Balenciaga, and Christophe Decarnin at Balmain, have reached back to punk,
    Westwood, the high priestess of the punk movement, ignored it.Her inspirations,
    instead, touched on Tutankhamen, Inca priestesses, Henri Matisse, Japanese 'Noh'
    theatre, Comedia dell'Arte, and the ballet.As the music switched from Rachmaninov
    to Scottish folk tunes, these references gave rise to many of Westwood's best-loved
    silhouettes: cleavage-bodices, with swathed shoulders, allied to ruched,bunched
    long skirts, or a perky mini, in a tapestry-floral. Pale metallic tartan taffeta
    was used for bloused dresses with wide belts and a train; and a floral ballgown,
    with fishtail-skirt, was cinched with a belt stamped with the word 'fragile'.\r\nVivienne
    Westwood Giant Orb Bag http:&#47;&#47;scienceathome.org&#47;studentresearcher&#47;include&#47;Vivienne-Westwood-Giant-Orb-Bag.html"
- id: 45950
  author: Vivienne Westwood Purses amazon
  author_email: kmwfmfbm@gmail.com
  author_url: ''
  date: '2014-09-16 00:23:10 +0000'
  date_gmt: '2014-09-16 00:23:10 +0000'
  content: "But the clothes, with their references to past civilizations, and heart
    motifs, also represented the fashion dowager's determined stance against global
    warming.\r\nVivienne Westwood Purses amazon http:&#47;&#47;www.overlookitalia.com&#47;news&#47;Vivienne-Westwood-Purses-amazon.html"
- id: 45951
  author: vivienne westwood online
  author_email: jfkbytku@gmail.com
  author_url: ''
  date: '2014-09-16 00:46:13 +0000'
  date_gmt: '2014-09-16 00:46:13 +0000'
  content: "Models wore their hair down and beach tousled. Military green jumpsuits
    had a relaxed, loose-fitting cut, but gilded copper details, fringed skirts and
    shoulder bags -- as well as killer platform sandals -- injected a bit of glamor.
    It was an understated, luxury look that will no doubt find favor at celebrity
    cocktail parties.\r\nvivienne westwood online http:&#47;&#47;www.rietirugby.com&#47;wp-content&#47;vivienne-westwood-online.html"
- id: 46065
  author: Boyce Werderman
  author_email: Horrell102@gmail.com
  author_url: http://wtfmedia.me/index.php?do=/blog/81949/do-you-need-to-become-knowledgeable-with-outlet-see-these-great-points/
  date: '2014-09-17 18:04:58 +0000'
  date_gmt: '2014-09-17 18:04:58 +0000'
  content: Great goods from you, man. I've understand your stuff prior to and you
    are just too fantastic. I actually like what you've got here, certainly like what
    you are stating and the way in which during which you say it. You make it entertaining
    and you still care for to stay it smart. I cant wait to read much more from you.
    That is really a wonderful web site.
- id: 46204
  author: property for sale new zealand
  author_email: Crossman151@gmail.com
  author_url: http://mycoolsite.blogdetik.com/2014/09/20/on-the-subject-of-property-for-sale-by-owner-as-well-as-residential-property-for-sale/
  date: '2014-09-20 09:54:52 +0000'
  date_gmt: '2014-09-20 09:54:52 +0000'
  content: Thanks  for the sensible critique. Me and my neighbor were just preparing
    to do some research about this. We got a grab a book from our area library but
    I think I learned more clear from this post. I am very glad to see such fantastic
    information being shared freely out there.
- id: 46452
  author: Nichole Schemmer
  author_email: Kral55@gmail.com
  author_url: http://webfrnd.com/socialmedia/index.php?do=/blog/28372/more-information-about-artificial-teeth/
  date: '2014-09-24 15:35:39 +0000'
  date_gmt: '2014-09-24 15:35:39 +0000'
  content: I cherished up to you'll receive carried out right here. The sketch is
    tasteful, your authored subject matter stylish. nevertheless, you command get
    got an edginess over that you want be turning in the following. unwell no doubt
    come more beforehand once more as precisely the similar just about a lot steadily
    within case you shield this hike.
- id: 46587
  author: buy fifa 15 coins
  author_email: Azzano426@aol.com
  author_url: http://www.proinso.net/fifasale31.html
  date: '2014-09-25 20:15:01 +0000'
  date_gmt: '2014-09-25 20:15:01 +0000'
  content: I truly enjoy looking at on this website , it contains fantastic content
    . "Do what you fear, and the death of fear is certain." by Anthony Robbins.
- id: 46594
  author: fifa 15 ultimate team coins
  author_email: Founds1312@aol.com
  author_url: http://bulgar-meta.ru/fifasale32.html
  date: '2014-09-25 20:40:27 +0000'
  date_gmt: '2014-09-25 20:40:27 +0000'
  content: Great website you have here but I was curious if you knew of any message
    boards that cover the same topics discussed in this article? I'd really love to
    be a part of online community where I can get feedback from other knowledgeable
    individuals that share the same interest. If you have any suggestions, please
    let me know. Thanks a lot!
- id: 47021
  author: makeup brush sets
  author_email: Hemmes181@gmail.com
  author_url: http://www.nexopia.com/users/bloggy/blog/171-a-good-guide-to-understand-more-on-makeup-looks-2014
  date: '2014-09-29 07:53:47 +0000'
  date_gmt: '2014-09-29 07:53:47 +0000'
  content: Unquestionably believe that which you stated. Your favorite justification
    appeared to be on the net the easiest thing to be aware of. I say to you, I certainly
    get irked while people think about worries that they just do not know about. You
    managed to hit the nail upon the top and also defined out the whole thing without
    having side effect , people can take a signal. Will likely be back to get more.
    Thanks
- id: 47908
  author: Adela Gronlund
  author_email: Seaney107@gmail.com
  author_url: http://leenleeinternational.com/index.php?mid=WomenActivity_Board&amp;document_srl=277143
  date: '2014-10-06 10:40:37 +0000'
  date_gmt: '2014-10-06 10:40:37 +0000'
  content: Hello! This is kind of off topic but I need some advice from an established
    blog. Is it hard to set up your own blog? I'm not very techincal but I can figure
    things out pretty fast. I'm thinking about setting up my own but I'm not sure
    where to begin. Do you have any tips or suggestions?  Thank you
- id: 48169
  author: Marlen Kazakos
  author_email: Intrabartolo98@gmail.com
  author_url: http://chatterfriends.com/index.php?do=/blog/160268/methods-to-increase-your-expertise-in-pest-control-in-london-something-many/
  date: '2014-10-09 06:25:29 +0000'
  date_gmt: '2014-10-09 06:25:29 +0000'
  content: My brother suggested I might like this website. He was once totally right.
    This post truly made my day. You can not consider simply how so much time I had
    spent for this information! Thank you!
- id: 48320
  author: Shondra Daughety
  author_email: Steinbaugh69@gmail.com
  author_url: http://www.frienditeplus.com/blogs/540666/1253487/around-pest-control-and-best-pes
  date: '2014-10-10 06:26:49 +0000'
  date_gmt: '2014-10-10 06:26:49 +0000'
  content: Hello there, I found your blog via Google while searching for a related
    topic, your website came up, it looks great. I have bookmarked it in my google
    bookmarks.
- id: 48898
  author: fix laptop
  author_email: Shumsky63@gmail.com
  author_url: http://www.freewebsite-service.com/carlo88/my+website.php?id=290335&amp;snavn=Computer+Repair+Tools+And+Pc+Repair+And+Maintenance
  date: '2014-10-13 17:44:40 +0000'
  date_gmt: '2014-10-13 17:44:40 +0000'
  content: It&acirc;&euro;&trade;s actually a nice and helpful piece of information.
    I&acirc;&euro;&trade;m glad that you shared this helpful information with us.
    Please keep us up to date like this. Thanks for sharing.
- id: 48981
  author: yacon syrup
  author_email: Hunte59@gmail.com
  author_url: http://bereanstechnology.com/index.php?q=node/50742
  date: '2014-10-14 03:48:00 +0000'
  date_gmt: '2014-10-14 03:48:00 +0000'
  content: Thanks  for the sensible critique. Me &amp; my neighbor were just preparing
    to do a little research on this. We got a grab a book from our local library but
    I think I learned more clear from this post. I'm very glad to see such fantastic
    info being shared freely out there.
- id: 49241
  author: Sharita Hawke
  author_email: Spoto31@gmail.com
  author_url: http://www.42wallabyway.com/blogs/249/1459/a-few-remarkable-points-on-everything-that-commercial-fitness-e
  date: '2014-10-15 18:14:46 +0000'
  date_gmt: '2014-10-15 18:14:46 +0000'
  content: I'm still learning from you, as I'm trying to reach my goals. I definitely
    love reading everything that is posted on your site.Keep the stories coming. I
    liked it!
- id: 49994
  author: Kellye Kottenstette
  author_email: Wenke15299@saigonrepo123.com
  author_url: http://bhdgdfsjakhf45hgnjhggg7ghdf.com
  date: '2014-10-20 16:39:00 +0000'
  date_gmt: '2014-10-20 16:39:00 +0000'
  content: We are a group of volunteers and opening a new scheme in our community.
    Your site provided us with helpful information to paintings on. You've performed
    an impressive process and our whole community will be thankful to you.
- id: 50057
  author: crorkz
  author_email: email@gmail.com
  author_url: ''
  date: '2014-10-20 23:33:20 +0000'
  date_gmt: '2014-10-20 23:33:20 +0000'
  content: AkSeNb Hi! I've been following your web site for some time now and finally
    got the bravery to go ahead and give you a shout out from  Houston Texas! Just
    wanted to tell you keep up the fantastic job!
- id: 50225
  author: Oswaldo Tharp
  author_email: Ledlie122@gmail.com
  author_url: http://salvadoriansbelike.com/index.php?do=/blog/2300/our-general-pest-control-issues-your-own-trusty-knowledge-basis/
  date: '2014-10-21 13:39:40 +0000'
  date_gmt: '2014-10-21 13:39:40 +0000'
  content: Hello! This post could not be written any better! Reading through this
    post reminds me of my old room mate! He always kept chatting about this. I will
    forward this article to him. Fairly certain he will have a good read. Thank you
    for sharing!
- id: 50287
  author: samsung galaxy 5
  author_email: Antonello177@gmail.com
  author_url: http://bbs.s.0w0.im/?p=299-everything-on-galaxy-s5-tough-armor-case
  date: '2014-10-21 17:02:03 +0000'
  date_gmt: '2014-10-21 17:02:03 +0000'
  content: Excellent blog right here! Additionally your site quite a bit up fast!
    What host are you the usage of? Can I am getting your associate link for your
    host? I want my web site loaded up as fast as yours lol
- id: 51639
  author: fifa 15 coins for ios
  author_email: yqowwrzl@gmail.com
  author_url: ''
  date: '2014-10-27 17:17:09 +0000'
  date_gmt: '2014-10-27 17:17:09 +0000'
  content: "FIFA 16 owners via my pc will be instigated to obtain a new headline update
    tonite.\r\nfifa 15 coins for ios http:&#47;&#47;www.fifacoinsin.co.uk"
- id: 51691
  author: buy cheap fifa 15 coins
  author_email: yqowwrzl@gmail.com
  author_url: ''
  date: '2014-10-27 20:52:20 +0000'
  date_gmt: '2014-10-27 20:52:20 +0000'
  content: "The new title update incorporates the following ..\r\nbuy cheap fifa 15
    coins http:&#47;&#47;www.futcoinscheap.co.uk"
- id: 51715
  author: buy cheap fifa 15 coins
  author_email: yqowwrzl@gmail.com
  author_url: ''
  date: '2014-10-27 22:07:32 +0000'
  date_gmt: '2014-10-27 22:07:32 +0000'
  content: "The new headline update involves the following ..\r\nbuy cheap fifa 15
    coins http:&#47;&#47;www.futcoinscheap.co.uk"
- id: 51914
  author: Glasgow West End PC Repair
  author_email: Cherry88@gmail.com
  author_url: http://glasgowcomputerrepairs.co.uk/
  date: '2014-10-28 14:37:51 +0000'
  date_gmt: '2014-10-28 14:37:51 +0000'
  content: You're certainly right and I understand you. When you want, we can as well
    speak about Computer Repair, something that intrigues me. The website is really
    amazing, take care!
- id: 52293
  author: FIFA Coins
  author_email: wxgvguhaky@gmail.com
  author_url: ''
  date: '2014-10-30 11:25:49 +0000'
  date_gmt: '2014-10-30 11:25:49 +0000'
  content: "About fifacoins. I reckon it's very effective, very like doing it, you
    do have sensations like this\r\nFIFA Coins http:&#47;&#47;www.efifacoins.co.uk&#47;fifa-15-coins&#47;xbox1.html"
- id: 52597
  author: cheap fifa 15 coins
  author_email: tcngwkkgpgs@gmail.com
  author_url: ''
  date: '2014-10-31 00:00:21 +0000'
  date_gmt: '2014-10-31 00:00:21 +0000'
  content: "About fifacoins. There's no doubt that it's very good quality, very like
    it again, you do have resulting feelings like this\r\ncheap fifa 15 coins http:&#47;&#47;www.fifa15coinsbuy.co.uk"
- id: 52691
  author: fifa 15 coins
  author_email: tcngwkkgpgs@gmail.com
  author_url: ''
  date: '2014-10-31 01:45:29 +0000'
  date_gmt: '2014-10-31 01:45:29 +0000'
  content: "About fifacoins. It looks like it's very very good, very like this, you
    do have self-confidence like this\r\nfifa 15 coins http:&#47;&#47;www.fifa15coinsbuy.co.uk"
- id: 52719
  author: buy cheap fifa coins
  author_email: tcngwkkgpgs@gmail.com
  author_url: ''
  date: '2014-10-31 02:23:19 +0000'
  date_gmt: '2014-10-31 02:23:19 +0000'
  content: "About fifacoins. I presume it's very effective, very like the following,
    you do have beliefs like this\r\nbuy cheap fifa coins http:&#47;&#47;www.efifacoins.co.uk"
- id: 52891
  author: Ramiro
  author_email: Say60@gmail.com
  author_url: http://salvadoriansbelike.com/index.php?do=/blog/2305/weslo-treadmills-discussed-right-now/
  date: '2014-10-31 11:51:31 +0000'
  date_gmt: '2014-10-31 11:51:31 +0000'
  content: An fascinating discussion is worth comment. I think that it is best to
    write extra on this topic, it may not be a taboo topic but usually individuals
    are not sufficient to talk on such topics. To the next. Cheers
- id: 53479
  author: Dominga Demik
  author_email: Pachter358@gmail.com
  author_url: ''
  date: '2014-11-02 01:45:50 +0000'
  date_gmt: '2014-11-02 01:45:50 +0000'
  content: "I'd personally personally favor Google. Both FB and Google would benefit
    from it, but we would likely benefit more from Google taking it over. In the case
    of Google+ it is just a matter of time. Facebook was lucky it didn't truly must
    compete with something as \"good\" as facebook, the competition was just lacking
    a lot of features in addition to a global approach.Google+ is outstanding to Facebook,
    but it really has a bigger challenge to get popular.Just look at VHS and Betamax.
    Betamax was better but lost due to bad marketing&#47;licensing.Danny recently
    posted..Black &amp; Decker NPP2018 18-Volt Cordless Electric Pole Chain Saw\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 53723
  author: Bunny Smallen
  author_email: Sheive105@gmail.com
  author_url: ''
  date: '2014-11-03 00:46:14 +0000'
  date_gmt: '2014-11-03 00:46:14 +0000'
  content: "Many many thanks for this put up! Some actually inspriational designs
    here. LC\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 54685
  author: buy xbox360 coins
  author_email: blecrzzk@gmail.com
  author_url: ''
  date: '2014-11-06 09:22:07 +0000'
  date_gmt: '2014-11-06 09:22:07 +0000'
  content: "How do you obtain FIFA Money?\r\nbuy xbox360 coins http:&#47;&#47;www.futcoinscheap.co.uk"
- id: 55374
  author: Art Reel
  author_email: Webbink359@gmail.com
  author_url: ''
  date: '2014-11-08 21:27:11 +0000'
  date_gmt: '2014-11-08 21:27:11 +0000'
  content: "You put your pals information for shipping address.\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 55430
  author: Tim Elgas
  author_email: Waker6@gmail.com
  author_url: ''
  date: '2014-11-09 01:10:49 +0000'
  date_gmt: '2014-11-09 01:10:49 +0000'
  content: "My dream retirement is to in no way need to deal when using the cold of
    winter or heat of summer. An A-Frame in Vermont as well as a cottage by the sea
    near Savannah.\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 56026
  author: buy FUT coins
  author_email: xdjkecykc@gmail.com
  author_url: ''
  date: '2014-11-11 17:10:21 +0000'
  date_gmt: '2014-11-11 17:10:21 +0000'
  content: "See this blog post , I feel fantastic , very good\r\nbuy FUT coins http:&#47;&#47;www.fifacoinssell.com"
- id: 56059
  author: FUT 15 Coins
  author_email: xdjkecykc@gmail.com
  author_url: ''
  date: '2014-11-11 19:15:59 +0000'
  date_gmt: '2014-11-11 19:15:59 +0000'
  content: "See this report , I feel top notch , very good\r\nFUT 15 Coins http:&#47;&#47;www.efifacoins.co.uk"
- id: 56067
  author: buy FUT coins
  author_email: xdjkecykc@gmail.com
  author_url: ''
  date: '2014-11-11 20:00:15 +0000'
  date_gmt: '2014-11-11 20:00:15 +0000'
  content: "See this guide , I feel fine , very good\r\nbuy FUT coins http:&#47;&#47;www.fifacoinsell.com"
- id: 56231
  author: CLAA102NA0ACW
  author_email: Dunnaway20@gmail.com
  author_url: http://www.laptopscreenwholesale.com/claa102na0acw--p-4639.html
  date: '2014-11-12 09:03:31 +0000'
  date_gmt: '2014-11-12 09:03:31 +0000'
  content: I frequently read through your articles carefully. I'm furthermore interested
    in lcd panels, you might talk about this sometimes. Have a great day!
- id: 56249
  author: B116XW03
  author_email: Bud84@gmail.com
  author_url: http://www.laptopscreenwholesale.com/b116xw03-p-4769.html
  date: '2014-11-12 10:06:41 +0000'
  date_gmt: '2014-11-12 10:06:41 +0000'
  content: You're certainly correct and I understand you. Whenever you want, we might
    as well talk regarding lcd monitors, one thing that intrigues me. The website
    is truly brilliant, cheers!
- id: 56392
  author: Stephen
  author_email: ''
  author_url: http://%/fijhah71
  date: '2014-11-12 21:21:35 +0000'
  date_gmt: '2014-11-12 21:21:35 +0000'
  content: |-
    <strong><a href="http:&#47;&#47;trustedpillspot.com&#47;?p=777&amp;lol= trusted@pillspot.com" rel="nofollow">.<&#47;a><&#47;strong>

    good.
- id: 56784
  author: S. Feathers
  author_email: Niewieroski44@gmail.com
  author_url: http://ncprojectseed.org/should-you-use-an-ecover-design-software/
  date: '2014-11-13 14:43:31 +0000'
  date_gmt: '2014-11-13 14:43:31 +0000'
  content: Do you have a spam issue on this site; I also am a blogger, and I was wondering
    your situation; we have developed some nice procedures and we are looking to exchange
    techniques with others, be sure to shoot me an email if interested.
- id: 58814
  author: Jonah Mereno
  author_email: Bridgewater29@gmail.com
  author_url: ''
  date: '2014-11-18 05:34:51 +0000'
  date_gmt: '2014-11-18 05:34:51 +0000'
  content: "You put your friends information for shipping address.\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 58890
  author: fifa coins for sale
  author_email: inwupqheobl@gmail.com
  author_url: ''
  date: '2014-11-18 08:33:28 +0000'
  date_gmt: '2014-11-18 08:33:28 +0000'
  content: "This article back to you, I feel exceptionally wrote for the pole, act
    out examples of the charm, simillar to magic, essentially very good, although
    i think this video game is also good quality, you can refer to\r\nfifa coins for
    sale http:&#47;&#47;www.fifa15coinsbuy.co.uk"
- id: 58908
  author: Dale
  author_email: ''
  author_url: http://%/aajjfdea95
  date: '2014-11-18 08:56:34 +0000'
  date_gmt: '2014-11-18 08:56:34 +0000'
  content: |-
    <strong><a href="http:&#47;&#47;com.albumstar.ru&#47;?p=31&amp;lol= supermachine@absurd.identities" rel="nofollow">.<&#47;a><&#47;strong>

    &Atilde;&plusmn;&Atilde;&frac12;&Atilde;&shy;&Atilde;&ordf;&Atilde;&plusmn; &Atilde;&sect;&Atilde;&nbsp; &Atilde;&uml;&Atilde;&shy;&Atilde;&acute;&Atilde;&sup3;!!
- id: 58997
  author: fifa 15 pre order xbox one
  author_email: svkajedik@gmail.com
  author_url: ''
  date: '2014-11-18 11:57:45 +0000'
  date_gmt: '2014-11-18 11:57:45 +0000'
  content: "This article back to you, I feel pretty wrote for the pole, be out among
    the charm, just as magic, incredibly very good, although i think mafia wars is
    also really good, you can seek advice from\r\nfifa 15 pre order xbox one http:&#47;&#47;www.fifacoinszone.co.uk&#47;ps3.html"
- id: 59192
  author: D. Griffin
  author_email: Stumpp50@gmail.com
  author_url: http://samsonplugin.net/
  date: '2014-11-18 20:02:04 +0000'
  date_gmt: '2014-11-18 20:02:04 +0000'
  content: Yesterday, while I was at work, my sister stole my apple ipad and tested
    to see if it can survive a forty foot drop, just so she can be a youtube sensation.
    My iPad is now destroyed and she has 83 views. I know this is totally off topic
    but I had to share it with someone!
- id: 59438
  author: Johnathan Hulbert
  author_email: Hopke138@gmail.com
  author_url: ''
  date: '2014-11-19 06:20:47 +0000'
  date_gmt: '2014-11-19 06:20:47 +0000'
  content: "that's what i used to be imagining ninth of nov wasn't away from this
    globe\r\n\r\nhttp:&#47;&#47;www.iyI5PdipBUiyI5PdipBU.com&#47;iyI5PdipBUiyI5PdipBU"
- id: 59972
  author: cheap fifa coins
  author_email: arijyxpzzz@gmail.com
  author_url: ''
  date: '2014-11-20 14:43:34 +0000'
  date_gmt: '2014-11-20 14:43:34 +0000'
  content: "Think of 12 Ibrahimovic very vly to discuss? I am +0 Ibrahimovic, I don't
    feel very good use, unquestionably unnecessary to shop for Ibrahimovic\r\ncheap
    fifa coins http:&#47;&#47;www.fifa15coinsbuy.co.uk&#47;fifa-15-coins&#47;pc.html"
- id: 60020
  author: Bev
  author_email: bev.dovey@zoho.com
  author_url: ''
  date: '2014-11-20 17:19:18 +0000'
  date_gmt: '2014-11-20 17:19:18 +0000'
  content: "The FOS in yacon also has other benefits in keeping weight down. Place
    the dates and remaining cranberries in processor and grind \r\nuntil fine and
    thick paste. Over the years, the process has become  and dependent on chemicals.\r\n\r\n\r\n\r\nmy
    site :: <a href=\"https:&#47;&#47;www.facebook.com&#47;yacon.syrup.whole.foods\"
    rel=\"nofollow\">yacon syrup<&#47;a>"
---
<p>Since my last post, I have made a lot of progress with LibreScribe. Just a few commits ago, LibreScribe gained the ability to retrieve a list of installed applications on the device, and add them to the list in the applications tab. I also fixed several other significant issues, including:<&#47;p>
<ul>
<li>When the smartpen is connected&#47;disconnected, the application no longer crashes, and the status is automatically refreshed<&#47;li>
<li>Device storage usage is now displayed in <a class="zem_slink" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Mebibyte" title="Mebibyte" rel="wikipedia">MiB<&#47;a> instead of in bytes. This makes it a lot less confusing how much space is remaining on your smartpen.<br &#47;><&#47;li>
<li>A bug, where the <a class="zem_slink" href="http:&#47;&#47;www.livescribe.com&#47;" title="Livescribe" rel="homepage">Echo Smartpen<&#47;a> was detected as an "unknown <a class="zem_slink" href="http:&#47;&#47;www.livescribe.com" title="Livescribe " rel="homepage">LiveScribe<&#47;a> Smartpen" in certain cases was fixed.<&#47;li>
<li><em>All <&#47;em>absolute paths have been removed from the project. All resources are now referenced using relative paths.<&#47;li>
<li>wxFormBuilder has been replaced with wxSmith. The entire <a class="zem_slink" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;User_interface" title="User interface" rel="wikipedia">user interface<&#47;a> has been recreated from scratch (although it's very similar to the old interface, intentionally)<&#47;li>
<li>Many C++ source and <a class="zem_slink" href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Header_file" title="Header file" rel="wikipedia">header files<&#47;a> are no longer necessary, so they have been removed, and merged into other files. This makes the codebase a lot more maintainable.<&#47;li>
<li>Duplicate <a class="zem_slink" href="http:&#47;&#47;www.kernel.org&#47;pub&#47;linux&#47;utils&#47;kernel&#47;hotplug&#47;udev.html" title="Udev" rel="homepage">udev<&#47;a> events (such as multiple add events of the same device) are ignored now. Previously, we ended up refreshing the device information up to four times in a row because of duplicate events. This significantly reduces the delay between plugging in a device and seeing a response on the screen.<&#47;li><&#47;ul>
<p>There are still tons of issues that still need to be fixed before LibreScribe becomes usable in a production environment, but I've been steadily making progress, and I hope to have something useful out soon.<br _mce_bogus="1"&#47;><&#47;p></p>
<div style="margin-top: 10px; height: 15px;" class="zemanta-pixie"><img style="border: medium none; float: right;" class="zemanta-pixie-img" alt="" src="http:&#47;&#47;dylanmtaylor.com&#47;wp-content&#47;uploads&#47;2011&#47;06&#47;pixy14.gif"&#47;><&#47;div></p>
