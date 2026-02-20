---
date: 2014-06-24
title: Private OpenVPN is Great!
description: Setting up a private VPN server on an Ubuntu VPS for better security and privacy at an affordable cost.
---
## Private OpenVPN is Great!

I finally got around to setting up a private VPN server, hosted in San Diego. It's hosted on an Ubuntu 14.04 VPS, with almost nothing else running on it except OpenVPN, and I'm pretty impressed with the results. Much cheaper than paying some company to set this up for you, and well worth the privacy. Only downside is the bandwidth cap of 250GB/month (or around a few cents per GB overage), but really, I'm mostly going to only use this on public wireless networks and on my phone to prevent eavesdropping, so it should suffice.

Not too bad for the price I'm paying:

![Speed test result](http://www.speedtest.net/result/3582109394.png)

For anyone interested on how to set this up, it's not too difficult assuming you can get a bare-minimum spec OpenVZ VPN with TUN/TAP support. To begin, you're going to want to head over to a [VPS provider, such as ChicagoVPS](https://billing.chicagovps.net/aff.php?aff=1128) and sign up for a bare minimum SSD Linux plan. The 256MB plan is perfect, and is still cheaper than public VPN services. You want to provision your server with Ubuntu 14.04 and log into it using SSH. I'm using the "ubuntu-14.04-x86_64" image on a 256MB SSD VPS. Once in your SSH console, download OpenVPN AS:

```
wget http://swupdate.openvpn.org/as/openvpn-as-2.0.8-Ubuntu14.amd_64.deb
```

Now install it:

```
dpkg -i openvpn-as-2.0.8-Ubuntu14.amd_64.deb
```

Set the password for your admin user (I just use this user for my VPS as I'm the only one on it)

```
passwd openvpn
```

And start the openvpn service:

```
service openvpn start
```

Now log in to https://[youripaddress]:943 using the password you set in the third step, and you can start your VPN and download files needed to connect to it. The server will offer you download links to clients for just about every operating system as well as instructions to set them up. This is by far the easiest and fastest VPN solution I've found - anywhere, and it's secure too! If you need a more powerful VPS server or more bandwidth, check out [Vultr](http://www.vultr.com/?ref=6805270) and [Digital Ocean](https://www.digitalocean.com/?refcode=4ba5a59684f6%20). I've used both of these services before and they offer significantly better performance.
