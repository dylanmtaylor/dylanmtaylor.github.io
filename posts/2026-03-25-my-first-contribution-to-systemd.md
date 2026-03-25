---
date: '2026-03-25'
title: "My First Contribution to systemd: Adding birthDate to userdb"
description: How and why I added an optional birthDate field to systemd's userdb, the privacy-respecting architecture behind it, and why I think it's the right approach for Linux distributions facing upcoming age verification laws.
---
## My First Contribution to systemd: Adding birthDate to userdb

Recently, I submitted [PR #40954](https://github.com/systemd/systemd/pull/40954) adding an optional `birthDate` field to systemd's userdb. For those unfamiliar, systemd is a whole ecosystem of utilities beyond just the init system, and userdb is the component that stores extended attributes about user accounts. This already includes fields like `emailAddress`, `realName`, and `location`. Adding `birthDate` as another optional field matches its existing purpose and isn't "bloat." The PR was reviewed by multiple people across multiple revisions before being merged; this was not "snuck in." As Karol Herbst [noted](https://gitlab.freedesktop.org/accountsservice/accountsservice/-/merge_requests/176#note_3386782), "people just showing up one day and fixing or implementing things isn't unheard of," and he had "no doubts that such a change would have been proposed by a prominent member of this community anyway."

It generated a lot of discussion, and a lot of what's been written about it misrepresents what the change actually does. Here's my side: the technical rationale, the architecture, and why I think this is the right approach.

### Attestation vs Verification

A common misconception about this change is that it introduces "age verification" to Linux. It doesn't. None of the PRs I submitted involve ID checks, facial recognition, or third-party verification services. You can enter any value, including January 1st, 1900. There is no proof required, no ID scanning, and no external tracking. Nor do I have any intention of that ever changing. This is age attestation, not verification. It's the same honor system the internet used in the early 2000s when every website asked for your date of birth and you could type whatever you wanted.

If all of the proposed PRs were merged, including the installer PRs and David Edmundson's [xdg-desktop-portal PR](https://github.com/flatpak/xdg-desktop-portal/pull/1922), here's what would actually happen in practice: during installation you would put in a date, whether or not it was honest, and applications would get a signal saying "yes, this user is 18+." The actual birth date would never be revealed to applications. That's it. Nothing else would change.

### Why I Did It

I've been an open-source contributor for a long time. I love Linux and other free and open source software. While I'm not a "big name" contributor compared to some, I help where I can as an unpaid hobby. I have [hundreds of contributions to archinstall](https://github.com/archlinux/archinstall/commits?author=dylanmtaylor) alone, going back years. I've probably installed Arch Linux more times than almost anyone else on this planet other than maybe Torxed, just from testing my changes on real hardware and VMs. I've used Linux for over 20 years at this point. Contrary to some people's accusations, I didn't just appear overnight with PRs for age attestation.

Three laws are going into effect on January 1, 2027: California's AB-1043, Colorado's SB26-051, and Brazil's Lei 15.211/2025. These laws effectively require that a self-reported birth date be collected during account creation on operating systems, and that this data be exposed to app stores via an API. I want to make something abundantly clear: I do NOT agree with these laws in any way. I think they are poorly written and overreaching. Lawmakers are largely technologically illiterate. They have no idea how things actually work, probably don't know Linux and FOSS exists, and are thinking of iPhones and Androids when they write these bills. For what it's worth, these bills were passed by both parties with very little dissent.

But whether we like these laws or not, they create a massive liability for system integrators and commercial enterprises that ship Linux on hardware, not to mention the free and open source maintainers who contribute to them. It's an unreasonable and entitled take to say "just don't follow the law" -- that is asking open source contributors to take on massive liability, thousands of dollars per child, for a project they are likely not paid to contribute to. People have suggested simply not allowing downloads from these jurisdictions as an alternative. Blocking significant portions of the United States from accessing Linux or other FOSS projects due to non-compliance would be a terrible outcome, one I'm actively trying to avoid. If distributions were to ship software that doesn't comply with the laws of multiple US states, it could become an existential threat to these free and open source projects.

My motivation was to provide a sane, technical solution to a legal problem. Not to endorse surveillance. Not because someone paid me. Not because I'm some kind of "true believer" in age verification. That's it.

### What the Change Actually Does

The `birthDate` field is a single optional field in `YYYY-MM-DD` format that defaults to unset. It accepts almost any value, including January 1st, 1900.

Lennart Poettering said as much when he closed the revert PR: systemd "enforces zero policy." The field is there if a distribution or installer wants to use it, and completely ignored if they don't.

### The Architecture

People keep asking why I submitted PRs to multiple projects, as if that's suspicious. It's not. Like many things in software development, multiple moving pieces need to fit together to form a working solution. On their own, they are not fit for purpose. The architecture I proposed looks like this:

- **userdb / AccountsService** as the storage layer
- **Installers** for having a date picker or prompt during account creation
- **xdg-desktop-portal** as a broker from the storage layer to applications, so they get an "18+" signal instead of direct access to personally identifiable information

These changes are designed to work with one another, and my PRs link to each other with explanations of how the pieces fit together. This development is being done entirely in the open. This is how cross-project infrastructure work happens -- see any other project with complexity like GNOME or KDE where interoperability between components is required.

I believe having a centralized, protected storage layer is a far saner and safer solution than having personally identifying information scattered across the filesystem in various formats. Without a standardized, local-first, privacy-respecting way to store this data, every app-level developer or system integrator will be forced to roll their own if they want to be compliant, or they will just avoid shipping Linux apps entirely if they see it as a liability. With centralization, we can secure it, control it, and minimize harm. Would you rather every app collect your age and store it all over the filesystem? Privacy-wise, this is a win.

It's also worth noting that the xdg-specs MR, which was based on [what Aaron Rainbolt suggested on the Freedesktop mailing list](https://lists.freedesktop.org/archives/xdg/2026-March/014792.html), is now closed. It's superseded by [David Edmundson's xdg-desktop-portal PR](https://github.com/flatpak/xdg-desktop-portal/pull/1922), which I think is the best approach for sharing just the age range with applications. Since people continued to comment on the closed MR, I asked the freedesktop project to lock it.

### "Hilariously Pointless"

Yes, I used the phrase "hilariously pointless" in the archinstall PR, and I stand by it. A self-reported birth date field will be completely ineffective at preventing anyone from lying about their age. And in the case of Arch Linux, you can install the system manually without archinstall, bypassing the prompt entirely.

But the laws don't require effective age verification at the OS level. They require the OS to collect and expose a birth date. The CA/CO laws will do probably nothing of value for children using Linux, and nobody is claiming otherwise, but not complying creates real liability for the companies and maintainers who ship it.

### The Case for birthDate Beyond Compliance

Something nobody seems to be talking about is that the `birthDate` field has legitimate uses completely unrelated to age verification laws.

Dominik George, founder of [Teckids](https://teckids.org/) and someone who has spent over a decade working with children in FOSS communities, [wrote on the systemd-devel mailing list](https://lists.freedesktop.org/archives/systemd-devel/2026-March/052087.html) in support of the field. His perspective is worth reading in full.

He points out that many parents won't let their children use Linux because it lacks parental controls, pushing them toward Google Family Link or Microsoft's equivalent, which bundle age restrictions with geolocation tracking and other invasive surveillance.

Dominik sees practical, non-surveillance uses for the field, like tailoring workshop laptops to age-appropriate defaults without restricting access to anything. This could make Linux a viable option for families who currently default to proprietary platforms with far more invasive controls.

His conclusion resonated with me: not having a `birthDate` field doesn't solve or prevent a single issue, but having it could help get more kids onto Linux and away from platforms that *actually* track and surveil them.

### Looking Back

I still believe an optional `birthDate` field is a sensible solution for the projects involved, and I think David Edmundson's xdg-desktop-portal approach for sharing just the age range with applications is the right way to handle this. I feel that regardless of my PRs, a similar change would have been proposed by someone else. It's not out of place in userdb. The only difference would be that I wouldn't have been the one to propose it.

This isn't just a Linux problem, either. MidnightBSD is [independently implementing age verification](https://docs.google.com/document/d/1_NKq0bpN1pOrMpHePuilJY7saXqXqhss6LwPTC6nSto/edit?usp=sharing) with new `aged` and `agectl` commands, libutil functions, modifications to `adduser`, and age-gated package installation in their mport package manager. They're facing the same regulatory pressure and arriving at similar conclusions. The laws don't care what kernel you're running.

The controversy around this change has been disproportionate to what the change actually does. It's an optional, nullable field in a user database. It enforces nothing. And the January 2027 deadline is still coming whether anyone likes it or not.

If you want to hear more of my perspective, I did a fairly extensive [interview with Brodie Robertson](https://www.youtube.com/watch?v=8bAN4Jam974) covering all of this in detail, in addition to the reaction to the change.
