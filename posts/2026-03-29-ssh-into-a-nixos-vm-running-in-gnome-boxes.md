---
date: '2026-03-29'
title: How to SSH into a NixOS VM Running in GNOME Boxes
description: How to enable SSH on a NixOS guest, set up port forwarding through QEMU's user-mode networking, and copy your SSH keys so you can work from the host terminal.
---
## How to SSH into a NixOS VM Running in GNOME Boxes

I spun up a NixOS VM in GNOME Boxes for some quick package development and testing. GNOME Boxes on its own works fine, but I wanted to SSH in from my host so I could use my normal terminal and copy files with `scp`. This turned out to require a few steps that aren't immediately obvious.

### The Problem: User-Mode Networking

GNOME Boxes uses QEMU with user-mode networking by default. The VM gets a NAT'd IP that isn't directly reachable from the host. You need port forwarding to get in.

### Enable SSH on the NixOS Guest

NixOS doesn't enable SSH by default. In the VM, edit `/etc/nixos/configuration.nix` using `sudo nano` to add:

```nix
services.openssh = {
  enable = true;
};
networking.firewall.allowedTCPPorts = [22];
```

The firewall line is important as NixOS enables its firewall by default, and without explicitly opening port 22, SSH connections will silently hang even though `sshd` is running.

Then rebuild and switch to the newly built OS environment:

```bash
sudo nixos-rebuild switch && sudo reboot
```

### Add Port Forwarding via the QEMU Monitor

In my case, I run GNOME Boxes as a Flatpak, so we have to use `virsh` inside its sandbox. First, find your VM name:

```bash
flatpak run --command=virsh org.gnome.Boxes -c qemu:///session list --all
```

Then add a forwarding rule that maps host port 2222 to guest port 22:

```bash
flatpak run --command=virsh org.gnome.Boxes -c qemu:///session \
  qemu-monitor-command nixos-unstab --hmp 'hostfwd_add tcp::2222-:22'
```

Replace `nixos-unstab` with whatever your VM is named.

### Copy Your SSH Keys and Connect

Now copy your keys and SSH in:

```bash
ssh-copy-id -p 2222 dylan@localhost
ssh -p 2222 dylan@localhost
```
Now you can easily copy files to your guest OS and run any commands you need to from the host's terminal