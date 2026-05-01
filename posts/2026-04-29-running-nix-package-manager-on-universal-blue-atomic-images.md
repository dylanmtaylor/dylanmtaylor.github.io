---
date: '2026-04-29'
title: Running Nix Package Manager on Universal Blue Atomic Images
description: How to overcome strictly read-only root filesystems on immutable Fedora images to run Nix.
---

## Running Nix Package Manager on Universal Blue Atomic Images

Universal Blue images like Bazzite, Bluefin, and Aurora provide a fantastic, cloud-native desktop experience based on Fedora's atomic technology. I'm a huge fan of this approach of building and shipping desktop images, and I've contributed a decent number of features and fixes to these projects (I recently helped with the release of Bazzite 44). However, I'm also a fan of the Nix package manager, and I recently ran into a major hurdle. As the root filesystem is mounted as strictly read-only, the standard Nix installation process can't create the necessary `/nix` directory.

In this post, I'll walk through how I successfully installed Nix natively on a Bazzite system without modifying the base image or sacrificing the benefits of an atomic system.

### The Problem: Composefs and the Immutable Root

Traditionally, Nix installers on like the one from deterministic systems would temporarily remove the immutable bit from the root directory, allowing them to create `/nix`. They would then bind-mount `/var/lib/nix` to that location for persistence.

With the introduction of **composefs** in Fedora 41, the root filesystem is not just "immutable" via file attributes; it is mounted as a truly read-only image by the kernel. Attempting to run `chattr` or `mkdir` on the root results in an error, even for the root user. This effectively breaks the standard installation path for Nix.

### The Solution: Transient Root

The most effective way to solve this without permanently modifying your system image is to use the `root.transient=true` kernel argument. This tells the system to mount the root filesystem with a writable `tmpfs` (RAM disk) overlay on top.

This has several advantages:
1. **Safety:** Any changes made directly to the root are wiped on reboot, maintaining the integrity of your atomic image.
2. **Selective persistence:** Since `/var` and `/home` are separate persistent mounts, any data you store there remains safe.
3. **Simplicity:** The overlay allows the Nix installer to create the `/nix` mount point during the boot process without resorting to using something like `nix-portable` instead.

### Enable Transient Root

To enable this, add the `root.transient=true` kernel argument. On modern images using **composefs**, you also need to explicitly configure ostree for a transient root and ensure that configuration is included in your initramfs:

```bash
sudo rpm-ostree kargs --append='root.transient=true'
sudo mkdir -p /etc/ostree
echo -e "[composefs]\nenabled = yes\n\n[root]\ntransient = true" | sudo tee /etc/ostree/prepare-root.conf
sudo rpm-ostree initramfs --enable --arg=-I --arg=/etc/ostree/prepare-root.conf
sudo systemctl reboot
```

This creates a new deployment with the necessary hooks to provide a writable overlay for the root filesystem. You can always roll back to your previous deployment if needed.

### Install Nix with the Determinate Installer

The **Determinate Nix Installer** is the standard way to installing Nix on non-NixOS systems. It includes a specific "ostree" planner designed for these environments.

With `root.transient=true` enabled, the installer can now successfully create the mount points it needs. Run the following command:

```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install ostree --no-confirm
```

**Note**: It is best practice to double check the safety of anything before piping it to a shell. You should review the script before executing it on your machine.

The `ostree` flag tells the installer to set up the appropriate systemd units to manage `/nix` as a bind-mount from `/var/home/nix` (or a similar persistent location).

### Why This Works

By using `root.transient=true`, you're effectively telling the OS: "I want a clean, immutable system, but I need to be able to temporary changes to the root filesystem such as mountpoints." 

When the system boots:
1. The initramfs sets up the transient overlay for `/`. This is very similar to how directories for temporary files function.
2. Systemd runs the `nix-directory.service` created by the installer, which creates the `/nix` directory in the overlay.
3. The `nix.mount` unit then bind-mounts the persistent Nix store (located in `/var/home/nix`) onto that newly created `/nix` directory.

The result is a Nix installation that survives reboots and doesn't interfere with your ability to update or rebase your OS image. This setup truly gives you the best of both worlds: the stability and reliability of an atomic, image-based desktop, combined with the power and flexibility of the Nix ecosystem.