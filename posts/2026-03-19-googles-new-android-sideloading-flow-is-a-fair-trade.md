---
date: '2026-03-19'
title: Google's New Android Sideloading Flow Is a Fair Trade
description: My reaction to Google's new "advanced flow" for sideloading Android apps, and why the extra friction is worth it to protect people from scams and surveillance.
---
## Google's New Android Sideloading Flow Is a Fair Trade

Last August, Google [announced](https://android-developers.googleblog.com/2025/08/elevating-android-security.html) that Android would begin requiring all apps to be registered by verified developers in order to be installed on [certified Android devices](https://www.android.com/certified/partners/). I was not happy about this. One of the main reasons I use Android is the freedom to install whatever software I want on my own device, and a blanket verification requirement felt like Google was moving in the iOS direction. But the motivation was clear: Google's analysis found over 50 times more malware from internet-sideloaded sources than from apps available through Google Play. Malicious actors were hiding behind anonymity to impersonate developers, distribute convincing fake apps, and commit fraud. Developer verification makes it harder for bad actors to quickly spin up another harmful app after the first one gets taken down.

Today, following the [settlement of the Epic Games antitrust case](https://techcrunch.com/2026/03/04/google-settles-with-epic-games-drops-its-play-store-commissions-to-20/), Google shared details about an "advanced flow" that allows users to opt out of the verification requirement entirely. The process is deliberately multi-step: enable developer mode, pass a check confirming nobody is coaching you through it, restart the phone (which kills any active calls or remote access sessions), wait a one-day cooling-off period, and then authenticate with biometrics or a PIN. After that, users can enable unrestricted sideloading for seven days or indefinitely.

### Initial Reaction

I'll admit my first instinct was frustration. I daily-drive a Pixel 9 Pro. I use F-Droid and sideload apps regularly -- emulators and other software that isn't on the Play Store. I value the freedom to install whatever I want on my own hardware, and that's a significant part of why I chose Android over iOS. The idea of additional friction to exercise that freedom felt like a step in the wrong direction.

Then I read the actual implementation details and thought about who this is really designed for.

### Who This Actually Protects

The multi-step process isn't targeting power users. It's targeting the person on the other end of a phone call telling a victim that their bank account has been compromised and they need to install a "security app" right now. According to the [Global Anti-Scam Alliance](https://gasa.org/knowledge-base/blog/global-scams-on-the-rise-over-half-of-adults-worldwide-report-scam-encounters), 57% of adults worldwide experienced a scam in 2025. Google specifically noted that scammers exploit fear to create urgency -- threats of financial ruin, legal trouble, or harm to a loved one -- and often stay on the phone with the victim, guiding them through the process of disabling security protections in real time.

Each step in the advanced flow directly counters a specific scam tactic. The mandatory restart kills any active phone call a scammer is using to coach the victim. The one-day waiting period eliminates the manufactured urgency that scammers depend on. The biometric confirmation ensures the device owner is the one making the change, not someone with temporary remote access. These are simple friction points that cost a technical user a few minutes once and protect vulnerable people from losing their savings.

There's another angle worth considering. The requirements aren't just anti-scam measures. They also make it significantly harder for someone with brief physical access to your device -- at a border crossing, during a traffic stop, or in any other coercive situation -- to silently install monitoring software. You can't tap through a few prompts and drop spyware on a phone anymore. The device restarts, active sessions are killed, and there's a 24-hour wait before the setting takes effect. That's a meaningful barrier against the kind of targeted surveillance that intelligence agencies are known to conduct.

### The Actual Impact on Power Users

For someone who already has developer mode enabled and knows what they're doing, such as myself, this is a one-time inconvenience. Enable the setting, wait a day, confirm with a fingerprint, set it to indefinite. After that, it's back to installing whatever you want from F-Droid, GitHub releases, or self-built APKs. Google will still show a warning for unverified developer apps, but it won't be blocked, and the developer doesn't need to register with Google, pay money, eyc. That's a welcome addition for the indie dev and open source community.

### A Fair Trade

As Google put it in their original announcement: "You shouldn't have to choose between open and secure." The implementation backs that up. The friction is one-time for power users, but it's a genuine obstacle for scammers and it makes opportunistic spyware installation meaningfully harder.
