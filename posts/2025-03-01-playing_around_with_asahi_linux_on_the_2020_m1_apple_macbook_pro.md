---
date: '2025-03-01'
title: Playing Around with Asahi Linux on the 2020 M1 Apple MacBook Pro
description: My experience of running Linux on Apple Silicon with Fedora Asahi Remix
---
## Playing Around with Asahi Linux on the 2020 M1 Apple MacBook Pro

![The welcome screen after installing Fedora Asahi remix](/images/blog/2025/03/welcome_to_fedora_asahi_remix.jpg)

For years now, I have been using the Dell Precision 5570 (upgraded from the 5540), running [Project Bluefin](https://projectbluefin.io/), which is an atomic/immutable Fedora image based off of Fedora Silverblue with "batteries included", including lots of developer tools. It's a great system and I'll keep using it for the foreseeable future. Recently, however, my work computer got an upgrade to a newer M4 model and I got an opportunity to play around with something I have been curious about for a while. That is, of course, [Asahi Linux](https://asahilinux.org/) on Apple silicon. Specifically, the 16 GB version of the 2020 13-inch M1 MacBook Pro.

### What is Asahi Linux?

Asahi Linux is a community-driven project aimed at bringing Linux to Apple Silicon Macs. The project has been working diligently to reverse-engineer Apple's hardware and develop drivers for Linux compatibility. While still in development, it's already quite usable for many tasks.

### Installation Process

Installing Asahi Linux is very straightforward. After wiping the computer to get a fresh install of macOS, and then installing all of the available updates, I began setting up Asahi Linux. The project provides an installer script that runs in macOS, which partitions the disk and sets up the system for dual-booting. Keeping macOS around is necessary because there is no mechanism available from within Linux yet for applying Apple's firmware updates, which often fix bugs and bring greater hardware support. I opted for the KDE desktop and 50% of the 512 GB for each operating system, as I am just playing around with this, but you can use the 'min' keyword to shrink macOS as much as possible if you are primarily using Linux. With a single command, you can launch the installer from your Administrator user:

```bash
curl https://alx.sh | sh
```

After downloading the necessary files and rebooting into recovery by long-pressing the power button, selecting to boot Asahi Linux, and entering the Mac admin password a couple of times, I was greeted by a familiar KDE login screen.

### Hardware Compatibility

I was genuinely impressed by how much hardware already works:

- Display including GPU acceleration (with conformant Vulkan and OpenGL drivers)
- Wi-Fi and Bluetooth
- USB-C ports (unfortunately DP-alt mode and Thunderbolt do not work)
- Keyboard and trackpad (with multi-touch gestures)
- Touch bar (acts as a function row with the FN key working for media, touch ID does not work yet)
- Audio (speakers, but not microphone yet -- and the audio quality is fantastic)
- Webcam works great and quality is very good - much better than the one on my Dell Precision 5570.

### Performance and Battery Life

Honestly, the M1 chip demonstrates impressive performance and power efficiency. I have been using x86 computers for as long as I can remember with the sole exception probably being the Raspberry Pi and some Android devices, if you count those. The system feels snappy and responsive. Of course, I tried to install Steam on it, as they recently added support for it via FEX emulation. I was very surprised at how well titles like Portal 2 ran on this machine. I was able to play that game with a very acceptable framerate, and couldn't even tell it was emulated from inside of the game. If you're not familiar, Portal 2 is not currently available in macOS as they have dropped 32-bit support from their OS. The Asahi Linux team actually did a [really great write-up about how they got Steam running](https://asahilinux.org/2024/10/aaa-gaming-on-asahi-linux/). 

Battery life is a mixed bag. While not as optimized as macOS, I still managed to get about 6 hours of regular usage, which is respectable for a Linux laptop.

Visual Studio Code works great, and has a native ARM 64 version. Firefox feels just as good as it does on x86 as well. Video playback is perfectly acceptable, and Asahi offers a `widevine-installer` package to view DRM content. Podman works great on ARM Linux, and I was even able to run software for other distributions (at least Ubuntu) using Distrobox with ease.

The terminal experience is excellent, naturally, and most CLI tools are built natively for ARM. Package availability is very good for ARM64 these days and is only getting better.

### Conclusion

Is Asahi Linux on an M1 MacBook ready to be your daily driver? If you want perfect hardware support, probably not yet. But it's remarkably close, and the progress the Asahi Linux team has made in such a short time is nothing short of extraordinary.

For now, I'll keep it around as a secondary system, but I'm excited to see how quickly things improve. The prospect of Thunderbolt support so that I can use my Dell dock and monitors/peripherals with a single cable is exciting. 

If you are curious about running Linux on Apple Silicon hardware, I'd definitely recommend giving Asahi Linux a try. You might be pleasantly surprised by how usable it already is.
