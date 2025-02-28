---
date: 2018-04-28
title: Fixing SSH Key Permissions
description: Fix permissions errors when trying to use SSH to connect from one server to another.
---
## Fixing SSH Key Permissions

If you've ever copied your SSH key from one sytem to another, you might see something along the lines of `permissions are too open` or `sign_and_send_pubkey: signing failed: agent refused operation` when trying to use SSH to connect from one server to another. Chances are the ownership or permissions of the `~/.ssh` directory and the files inside of it are not correct. This can easily be fixed. As the user you're trying to SSH to a server, run these commands:


```
sudo chown -R $USER:$USER ~/.ssh
sudo chmod 0600 ~/.ssh/*
sudo chmod 0700 ~/.ssh/
```

Once you've tried that, you should be able to SSH to your server again. I've hit this issue a number of times, so I hope this post helps someone out.