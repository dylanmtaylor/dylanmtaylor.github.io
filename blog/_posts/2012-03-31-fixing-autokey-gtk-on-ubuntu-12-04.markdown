---
layout: post
status: publish
published: true
title: Fixing Autokey (GTK) on Ubuntu 12.04
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan.m.taylor92@gmail.com
  url: ''
author_login: dylanmtaylor
author_email: dylan.m.taylor92@gmail.com
wordpress_id: 1128
wordpress_url: http://dylanmtaylor.com/?p=1128
date: '2012-03-31 05:16:07 +0000'
date_gmt: '2012-03-31 05:16:07 +0000'
---
<p>Autokey is a wonderful scripting tool for <a class="zem_slink" title="Linux" href="http://en.wikipedia.org/wiki/Linux" rel="wikipedia" target="_blank">Linux</a>. Unfortunately, it doesn't work out of the box in <a class="zem_slink" title="List of Ubuntu releases" href="http://www.ubuntu.com/" rel="homepage" target="_blank">Ubuntu 12.04</a>. The reason why is because Autokey isn't on the Unity panel's system tray whitelist. I submitted <a href="https://bugs.launchpad.net/ubuntu/+source/autokey/+bug/970581">a bug report on Launchpad</a>, but for now, if you want to get Autokey working without breaking the Unity panel for any other applications, it's as simple as running the following command in the terminal:</p>
<pre>if grep -q 'Autokey' &lt;(echo `gsettings get com.canonical.Unity.Panel systray-whitelist`); then echo "'Autokey' exists in Unity panel whitelist. Nothing to do here."; else echo "Adding 'Autokey' to Unity panel whitelist." &amp;&amp; gsettings set com.canonical.Unity.Panel systray-whitelist "`echo <p>Autokey is a wonderful scripting tool for <a class="zem_slink" title="Linux" href="http://en.wikipedia.org/wiki/Linux" rel="wikipedia" target="_blank">Linux</a>. Unfortunately, it doesn't work out of the box in <a class="zem_slink" title="List of Ubuntu releases" href="http://www.ubuntu.com/" rel="homepage" target="_blank">Ubuntu 12.04</a>. The reason why is because Autokey isn't on the Unity panel's system tray whitelist. I submitted <a href="https://bugs.launchpad.net/ubuntu/+source/autokey/+bug/970581">a bug report on Launchpad</a>, but for now, if you want to get Autokey working without breaking the Unity panel for any other applications, it's as simple as running the following command in the terminal:</p>
gsettings get com.canonical.Unity.Panel systray-whitelist | tr -d ]<p>Autokey is a wonderful scripting tool for <a class="zem_slink" title="Linux" href="http://en.wikipedia.org/wiki/Linux" rel="wikipedia" target="_blank">Linux</a>. Unfortunately, it doesn't work out of the box in <a class="zem_slink" title="List of Ubuntu releases" href="http://www.ubuntu.com/" rel="homepage" target="_blank">Ubuntu 12.04</a>. The reason why is because Autokey isn't on the Unity panel's system tray whitelist. I submitted <a href="https://bugs.launchpad.net/ubuntu/+source/autokey/+bug/970581">a bug report on Launchpad</a>, but for now, if you want to get Autokey working without breaking the Unity panel for any other applications, it's as simple as running the following command in the terminal:</p>
,
<p>This will check your current whitelist to see if Autokey is present, and if it isn't intelligently append it to the whitelist without messing up your current whitelist entries. If it's already there, it won't add a duplicate entry. This one-liner can be easily modified to add any value you want to Unity's system tray whitelist, in order to fix the same problems with other applications. Note that you may have to log out and log back in before the changes take effect. Enjoy! :)</p>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="float: right;" src="http://img.zemanta.com/pixy.gif?x-id=24cf85f1-d93f-40e5-a099-705c19573173" alt="" /></div>
Autokey
<p>This will check your current whitelist to see if Autokey is present, and if it isn't intelligently append it to the whitelist without messing up your current whitelist entries. If it's already there, it won't add a duplicate entry. This one-liner can be easily modified to add any value you want to Unity's system tray whitelist, in order to fix the same problems with other applications. Note that you may have to log out and log back in before the changes take effect. Enjoy! :)</p>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="float: right;" src="http://img.zemanta.com/pixy.gif?x-id=24cf85f1-d93f-40e5-a099-705c19573173" alt="" /></div>
]`"; fi</pre>
<p>This will check your current whitelist to see if Autokey is present, and if it isn't intelligently append it to the whitelist without messing up your current whitelist entries. If it's already there, it won't add a duplicate entry. This one-liner can be easily modified to add any value you want to Unity's system tray whitelist, in order to fix the same problems with other applications. Note that you may have to log out and log back in before the changes take effect. Enjoy! :)</p>
<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;"><img class="zemanta-pixie-img" style="float: right;" src="http://img.zemanta.com/pixy.gif?x-id=24cf85f1-d93f-40e5-a099-705c19573173" alt="" /></div>
