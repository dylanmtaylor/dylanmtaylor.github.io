---
date: '2026-03-28'
title: Migrating from Google Photos to Self-Hosted Immich
description: How I moved my photo library from Google Photos to a self-hosted Immich instance, accessible from my phone anywhere via Tailscale.
---
## Migrating from Google Photos to Self-Hosted Immich

I spent most of today migrating my photo library off of Google Photos and onto [Immich](https://immich.app/), an open source, self-hosted photo and video management solution running on my own homelab server. It's designed as a direct replacement for Google Photos, and it shows. The interface is strikingly similar. This is just the latest step I've taken towards being self-reliant and hosting my own data.

The web UI feels polished and familiar. The sidebar has all the sections you'd expect -- Photos, Explore, Map, Sharing, Albums -- and the settings page gives you control over everything from API keys to authorized devices. I also bought the $100 lifetime server license to support the project, since I think what they're building is genuinely excellent.

![Immich settings page showing the web interface with albums, storage usage, and server status](/images/blog/2026/03/immich-settings.png)


### Why Not Just Use Google Photos?

I don't like having all of my eggs in one basket. Google already controls a large amount of my digital life. Having every photo or video I've ever taken sitting on Google's servers on top of all that is a lot of trust to place in a single company. I will continue to use it as an off-site backup as I do pay for a number of their services and have 1 TB of free storage included with Google fiber, and obviously I'm not worried about Google disappearing overnight, but I do feel strongly about having having a local copy of my data on my own hardware. There's something satisfying about knowing that my photos are sitting on disks in my house, not in some data center where I'm the product. Self-hosting gives me full control over my data, and I don't have to worry about storage limits or subscription fees. I have 36 x 6TB of storage in a disk shelf and in my PowerEdge R730, and couldn't imagine how much it would cost to store anywhere near that much in the cloud on a recurring basis. Of course, I don't have that much personal content, but now I will never have to even consider worrying about running out of storage.


### Contributing the DockSTARTer Template

I've actually been itching to make this switch for a while. Back in February, I [contributed the Immich template to DockSTARTer](https://github.com/GhostWriters/DockSTARTer-Templates/pull/120), closing a long-standing application request. DockSTARTer is what I use to manage Docker containers on my home server, and Immich was one of the apps that people had been asking for, for a long time. I wrote the template to include all four required services: the main Immich server, the machine learning container for smart search and facial recognition, PostgreSQL, and a Valkey cache. This is just a single DockSTARTer app so users don't have to configure each piece separately. I tested it on my server, got it reviewed and merged, and have been running it ever since. So by the time I sat down today to actually migrate my photo library over, the infrastructure was already in place and battle-tested.

### The Migration Process

Getting my photos out of Google was straightforward thanks to [Google Takeout](https://takeout.google.com/). Takeout lets you export your data from any Google service, and Google Photos is one of the options. I do wish that there was a way to stream data out of Google rather than downloading many archives, but it is what it is. I like to have a recent copy of my data, so I've scheduled exports, but honestly it's a pain to download terrabytes of data every quarter just to have a local copy.

Anyways, once I had the archives downloaded and extracted, I simply imported them into Immich.

### Mobile Access with Tailscale

The whole point of a photo backup solution is that it works seamlessly from your phone. Immich has native apps for both Android and iOS, so I installed the Immich app on my Google Pixel and pointed it at my server. The app is configured to automatically upload new photos and videos to my Immich instance, just like Google Photos did to Google's servers. The difference is that now the photos go to my hardware instead.

The obvious challenge with self-hosting is access from outside your home network. This is where [Tailscale](https://tailscale.com/) comes in. Tailscale creates an encrypted mesh VPN between your devices using WireGuard under the hood. My phone and my server are both on my Tailscale network, which means I can access Immich from anywhere over an encrypted connection without exposing any ports to the public internet. Tailscale honestly just works, and the connection is encrypted end-to-end.

### The Result

My photo library is now fully self-hosted. New photos from my Pixel automatically upload to Immich over Tailscale, I have a local copy of everything on my own storage, and the web interface is so excellent that I don't miss Google Photos at all. I still use an uncomfortable number of Google services, but every piece of data I can move to infrastructure I control is a win.

If you're fine with hosting things yourself and considering making the switch, I'd recommend it. Immich is mature enough for daily use, the migration from Google Photos is straightforward with Takeout, and with a tunnel back to your server, it can automatically backup your photos in realtime.
