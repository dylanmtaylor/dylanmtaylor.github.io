---
date: 2021-10-24
title: Manually Setting the Fan Speed on a Dell PowerEdge R710 Homelab Server
description: A guide to manually control fan speed on Dell PowerEdge R710 server using ipmitool to reduce noise while maintaining temperature.
---
## Manually Setting the Fan Speed on a Dell PowerEdge R710 Homelab Server

As many of my friends and family know, I like to self-host a lot of applications in my own home. To do this, I purchased a 12U rack and filled it with networking equipment that sits in the closet of one of the bedrooms in my home that I also use as a computer room for my gaming PC. I leave the door of the closet open for ventilation, and I have one of my rackmount servers in particular running 24/7. This server has many containerized applications running in Docker on top of Ubuntu LTS. I've got a 1TB M.2 NVMe boot drive in the PCIe slot as a boot drive and at the moment, I have 6 6TB SAS hard drives in the 3.5" bays on the front. This is using OpenZFS 2.0 and I've got it configured to run in RAID-Z2 (double parity). Effectively, by reducing the maximum storage from 36TB to 23TB, I can lose 2 drives that can be hot-swapped in without losing all of my data. I have all of my media stored on this system and served using Plex, and it also runs DNS for my whole network using Pi-Hole, among other media-related things. The setup works fantastic, and dockstarter really made it easy to set up all of the containers, but unfortunately, it has the side effect of being really loud. At least, by default that is. I found out through a Reddit post that you can actually disable automatic fan control on this particular system and set the fan speed to anything you'd like using the iDRAC controller built into the system, and as long as the iDRAC doesn't lose power, the value will persist (or you can just re-apply as desired). This requires a utility called ipmitool, which unfortunately doesn't have very user-friendly commands. The fan speed values are also in hexadecimal, so setting them requires converting a decimal number to hex before issuing the command. For my own use though, I created a quick script that lets me set the fan speed to whatever value I want (between 0 and 100 percent), and it works great:

```
#!/bin/env sh
# Usage: Install ipmitool, edit with your IP and password or put password in ~/idrac_password.txt. Run ./fan_control.sh [0 to 100].
echo "Disable automatic fan control on the server."
ipmitool -H 192.168.2.43 -I lanplus -U root -P $(cat ~/idrac_password.txt) raw 0x30 0x30 0x01 0x00
echo "Setting fan speed to $1% ..."
ipmitool -H 192.168.2.43 -I lanplus -U root -P $(cat ~/idrac_password.txt) raw 0x30 0x30 0x02 0xff $(printf "0x%04x" $1)
echo "Done."
```

I can't take any credit for figuring out the ipmitool commands, but I've tested this and it works great with any speed you'd want. In my case, I try to keep the temperatures reasonable to prolong the life of my hardware, so I've set it to 15% (still very quiet). Sure, you don't need a helper script for this, you can just run the ipmitool command but it definitely helps. 

In order to turn automatic fan control back on, you just issue that first impitool command with 0x01 instead of 0x00 at the very end to switch that bit.
