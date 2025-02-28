---
date: 2021-10-25
title: Upgrading My SSH Keys To The Ed25519 Algorithm
description: Upgrading from RSA 2048 to Ed25519 SSH keys for better security and performance.
---

Like many people who interact with systems over the internet professionally, I've used a public/private keypair for authentication for ages. In fact, I've used the same RSA 2048 keypair since around 2011. That's around _ten years_ of using the same keypair (so from a security sanitation perspective, generating a new one probably doesn't hurt). While I don't necessarily have any reason to believe that this key was compromised, an attacker would certainly have enough time to brute force it if they wished. More importantly though, after reading [a great article on Medium](https://medium.com/risan/upgrade-your-ssh-key-to-ed25519-c6e8d60d3c54), I realized that RSA 2048 is no longer the best practice, and it's definitely not more secure than Ed25519, which is a newer algorithm that's only been around for 5 years or so. This key type offers significantly stronger encryption per-bit, and is more mathematically complex. Following a recommendation online, I also made it use a large (100) number of key derivation function iterations with the `-a` option in order to make my passphrase significantly harder to decrypt. It's also significantly shorter to the point where you could feasibly type in the whole thing from a virtual terminal console. In my experience, it definitely feels like it takes less time to login to an SSH session (placebo?) than before, and I'm happy enough with it that I'm going to roll out new SSH keys for all of my systems and accounts. 

If you're interested in this, there's a great post called [Secure Secure Shell](https://stribika.github.io/2015/01/04/secure-secure-shell.html) that goes into SSH key security in-depth far more than I ever possibly could. It also goes into how to configure the SSH server properly.


tl;dr: Use one of the following commands to generate SSH keys with currently recommended best practices:

```
ssh-keygen -t ed25519 -o -a 100
ssh-keygen -t rsa -b 4096 -o -a 100
```
