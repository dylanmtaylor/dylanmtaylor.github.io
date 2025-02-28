---
date: '2018-05-16T21:22:15-04:00'
title: How to Install the Latest Master Branch Build of Slic3r
description: Slic3r is a 3D printer slicing tool. It converts digital objects into instructions that are readable by a 3D printer called "gcode".
---

[Slic3r](http://slic3r.org/) is a 3D printer slicing tool. It converts digital objects into instructions that are readable by a 3D printer called "gcode". I use this program with my 3D printer, an Original Prusa i3 MK2s in order to position, rotate, and scale objects on the print bed and then select how I would like it to be printed. It's an excellent tool for the most part, and it competes quite well with the proprietary tool [Simplify3D](https://www.simplify3d.com/). Improvements seem to be added quite frequently. However, I have noticed that for some reason, the `slic3r` package on Ubuntu 18.04 breaks when running it with the Nvidia proprietary graphics driver installed, but this does not affect the slic3r appimage package or upstream tarball releases. In order to solve this issue, you can easily get the files, extract them and create a menu entry using this method:


```
wget -N https://dl.slic3r.org/dev/linux/Slic3r-master-latest.tar.bz2
sudo rm -rf /opt/Slic3r/
sudo tar xvjf Slic3r-master-latest.tar.bz2 -C /opt/
```

This puts a self-contained installation of the bleeding-edge version of Slic3r in the /opt directory. You can then put the following into `/usr/share/applications/slic3r_master.desktop` to add a desktop icon:

```
[Desktop Entry]
Version=1.0
Type=Application
Name=Slic3r
Icon=/opt/Slic3r/var/Slic3r.png
Exec=bash -c 'cd /opt/Slic3r && /opt/Slic3r/Slic3r --gui %F'
Keywords=perl;slice;3D;printer;convert;gcode;stl;obj;amf;
StartupNotify=false
StartupWMClass=slic3r
MimeType=application/sla;model/x-wavefront-obj;model/x-geomview-off;application/x-amf;
Categories=Development;Engineering;
```

If you're like me and you're using the wonderful [Papirus icon theme](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme) or another theme providing the icon, editing the "Icon" line to be just "Icon=slic3r" will give you a properly themed icon for Slic3r since the icon path is no longer hardcoded and your desktop environment will look for the icon under `/usr/share/icons/`. You should now be able to start slic3r without any issues, even with the driver installed. This is also great for testing out new unstable features and finding bugs, if you're into that sort of thing.


