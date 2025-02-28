---
layout: post
status: publish
published: true
title: Fixing Autokey (GTK) on Ubuntu 12.04
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2012-03-31 05:16:07 +0000'
date_gmt: '2012-03-31 05:16:07 +0000'
---

Autokey is a wonderful scripting tool for [Linux](http://en.wikipedia.org/wiki/Linux). Unfortunately, it doesn't work out of the box in [Ubuntu 12.04](http://www.ubuntu.com/). The reason why is because Autokey isn't on the Unity panel's system tray whitelist. I submitted [a bug report on Launchpad](https://bugs.launchpad.net/ubuntu/+source/autokey/+bug/970581), but for now, if you want to get Autokey working without breaking the Unity panel for any other applications, it's as simple as running the following command in the terminal:

```
if grep -q 'Autokey' <(echo `gsettings get com.canonical.Unity.Panel systray-whitelist`); then echo "'Autokey' exists in Unity panel whitelist. Nothing to do here."; else echo "Adding 'Autokey' to Unity panel whitelist." && gsettings set com.canonical.Unity.Panel systray-whitelist "`echo gsettings get com.canonical.Unity.Panel systray-whitelist | tr -d ] , Autokey ]`"; fi
```

This will check your current whitelist to see if Autokey is present, and if it isn't intelligently append it to the whitelist without messing up your current whitelist entries. If it's already there, it won't add a duplicate entry. This one-liner can be easily modified to add any value you want to Unity's system tray whitelist, in order to fix the same problems with other applications. Note that you may have to log out and log back in before the changes take effect. Enjoy! :)

