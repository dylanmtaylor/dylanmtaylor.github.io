---
date: '2026-11-09'
title: "Becoming a Maintainer of the ArtCraft Crafting Apps"
description: I found the ArtCraft Crafting Apps on Hacker News while people were calling them AI slop. A month later, I'm a maintainer building their Linux package repositories, CI quality gates, and infrastructure.
---
## Becoming a Maintainer of the ArtCraft Crafting Apps

A little over a month ago, I was scrolling through [Hacker News](https://news.ycombinator.com/) and came across a post about a suite of open source creative apps written from scratch in Rust: a photo editor, a vector art tool, a video editor, a page layout tool, a DAW, and a whole lot more. The comments were about what you'd expect. A lot of people dismissed the whole thing as AI slop and moved on. I clicked through to the code instead, and I came away with a very different impression.

After making many contributions to improve the quality of these apps, I'm now a maintainer of that project, [ArtCraft](https://github.com/storytold/artcraft) and the rest of the Crafting Apps under the [storytold](https://github.com/storytold) GitHub organization. I'm also one of the project's GitHub and infrastructure admins, and I'm helping out with software builds, continuous integration, and Linux packaging. In that time I've had over 1,000 pull requests merged across the organization and reviewed more than 500 others. It's been one of the more fun open source projects I've been involved with in a while, so I wanted to write up how I got here and what I've been working on.

### Looking Past the "AI Slop" Label

Yes, these apps are built with heavy use of AI coding agents. That alone isn't a reason to write them off. Most professional software development is done with AI assistance at this point, including at my day job, and the quality of the result comes down to the decisions the people steering it make and the guardrails they put around it. What stood out to me when I actually read through the repositories was how many intelligent decisions were made while bootstrapping them, in order to ensure long-term maintainability.

Writing everything in pure Rust means the code that parses PSDs, PDFs, fonts, and video containers, which is exactly the kind of code that historically gets exploited - since you have untrusted inputs, is memory safe by default. The apps are clean-room reimplementations of the reference applications, so they look and feel familiar to designers and editors with decades of muscle memory. Common functionality like updating, printing, fonts, color management, and window decorations lives in shared libraries in [craft-libs](https://github.com/storytold/craft-libs) instead of being reinvented per app, and we're working to extract even more functionality out and have common file format, window decoration, printing, and UI element support. Translations live in one shared catalog in [craft-i18n](https://github.com/storytold/craft-i18n). There's a single [launcher](https://github.com/storytold/craft-launcher) for discovering, installing, and updating everything, and the individual applications themselves reuse that logic via an update crate so it doesn't need to be reinvented for each one. None of that is what slop looks like. It looked like a project with a real architecture that just needs more hands.

### Why It Mattered to Me

I've been using Linux for over 20 years, and the reason I hear most often from people who would like to switch full-time but haven't is that the applications they rely on don't run on it. Adobe and Microsoft office are the primary culprits for this now. Gaming used to be the other big one, and Valve's Proton has mostly taken care of that. Their contributions to the Linux desktop have been tremendous. Creative software is still a gap. If you do photo editing, vector art, video editing, page layout, or audio work professionally, the industry standard tools are almost all Windows and macOS only, and the open source alternatives usually don't fill the same role.

While the original author made them out of frustration with professional software's subscription model rather than lack of availability on Linux, the Crafting Apps are attempting to solve this: [PhotoCraft](https://github.com/storytold/photocraft), [VectorCraft](https://github.com/storytold/vectorcraft), [FilmCraft](https://github.com/storytold/filmcraft), [EffectCraft](https://github.com/storytold/effectcraft), [DesignCraft](https://github.com/storytold/designcraft), [SoundCraft](https://github.com/storytold/soundcraft), [PdfCraft](https://github.com/storytold/pdfcraft), [CADCraft](https://github.com/storytold/cadcraft), [WordCraft](https://github.com/storytold/wordcraft), [GridCraft](https://github.com/storytold/gridcraft), [DeckCraft](https://github.com/storytold/deckcraft), and more. All of them run on Windows, macOS, Linux and FreeBSD, and Linux support has been there from the start rather than something tacked on later. Someone was finally working on one of the things that keeps people from switching, and I loved that. 

Originally, I wasn't sure I wanted to have anything to do with building the apps, but figured that the least I could do was make sure installing these apps on Linux was as good as it could be. So I opened a pull request. Then another one. Then a lot more.

### Native Linux Package Repositories

The biggest thing I've personally shipped so far is everything on [getartcraft.com/linux](https://getartcraft.com/linux). When I started, Linux users could grab packages from a GitHub release, and that was about it. People started building launchers and eventually the project built their own official one inspired by all of the community ones, but that still wasn't fully native. Now there are proper repositories for the major package managers:

- A **Flatpak** repository that works on almost any modern distribution. It's published as an OCI repository, so Flatpak pulls the apps from a container registry, and they update with the rest of your Flatpaks.
- An **APT** repository for Debian, Ubuntu, and derivatives.
- An **RPM** repository for Fedora, RHEL, and openSUSE.
- A **pacman** repository for Arch Linux and derivatives.

All of the packages and the repository metadata are signed with a key that I personally minted, and the public signing key is published so your package manager can verify everything it installs. Getting signing working across every format took a bunch of effort, but I managed. There's now a CI matrix that installs the apps from the repositories on Ubuntu, Debian, Fedora, RHEL, openSUSE, and Arch on every single change to the website which serves these repos, so a broken repository gets caught before users run into problems.

On November 6th, we felt that the package repos were in a usable state, and Boots, one of the owners, announced it to the community on Discord:

> Linux support has always been offered by ArtCraft as a first-class option. Now, Linux users can install and update our apps through native Linux package managers. The Flatpak repository will work on almost any modern Linux distribution, and we also provide repositories with packages for Debian-based, Red Hat-based, and Arch-based Linux distributions. While we want to offer users of any Linux distribution our software, we are testing these packages against Ubuntu and Debian, Fedora and RHEL, openSUSE, and Arch Linux. Linux represents around 1/4th of our market share, and we're excited to make installing and updating ArtCraft easier for the Linux community.
>
> And to everyone who helped us reach 33 million downloads: thank you for choosing ArtCraft, sharing it with others, sending feedback, and helping our community grow. Every download represents someone creating, exploring, or trying something new with our tools. We're grateful to have you with us, and excited to keep building.
>
> Explore the repositories and installation instructions at https://getartcraft.com/linux
>
> Everyone thanks @Dylan for spearheading this.

Getting a shout out in front of the whole community definitely made my day, and yes, we have metrics on downloads from GitHub, and it turns out that a statistically far higher than average number of the users of the ArtCraft applications are on Linux.

### Guardrails for AI-Assisted Development

None of this means the "AI slop" concern is entirely wrong. AI doesn't make code bad, but it makes it very easy to produce a lot of code quickly, and these projects move fast. There's a steady stream of pull requests from community contributors, most of them written with coding agents, and without checks and guardrails, code can land that nobody has looked at very closely. This is the same problem every team using AI has, including mine at work, and the answer is the same: don't trust anything that hasn't been checked. I wanted to get automated quality gates in place before the volume got out of hand.

I introduced [SonarQube Cloud](https://www.sonarsource.com/products/sonarcloud/) and [CodeRabbit](https://www.coderabbit.ai/) into the pipeline. Both are, generously, free for open source projects. SonarQube Cloud runs on every pull request through a reusable workflow, and measures Rust coverage and "code smells" like maintainability and reliability issues. CodeRabbit reviews every pull request before a human does. Sometimes multiple times - and it learns from discussions it has with contributors as well. I also enforced Rust coding standards with Clippy across the project to avoid unnecessarily complex code, set up Dependabot, and made sure every GitHub Action could be standardized on a reusable collection of them.

CodeRabbit also gave the project $5,000 in free Deep Scans as part of their support for open source projects, which was incredibly generous (thank you, CodeRabbit!). Those scans turned up a lot of real issues, and I've (and by that, I mean my Claude agent running Sonnet 5.5) spent a good chunk of time and tokens remediating them. A lot of it was the kind of thing you'd expect in software that parses untrusted files: unbounded allocations, decoders that could be made to do complicated work, and archive extraction that didn't fully guard against path tricks. Memory safety doesn't necessarily mean a codebase is bug free or without security concerns. 

### Infrastructure

The ArtCraft website was hosted on Netlify, and the bandwidth bills were getting expensive. Since it was posted on Hacker News, it had served hundreds of terrabytes of data and billions of requests. To help the project not spend hundreds of thousands of dollars a year on bandwidth, I ported the entire website to Cloudflare Pages and Workers, with much of the infrastructure managed in OpenTofu and the state stored in Cloudflare R2. Cloudflare doesn't charge for egress the way Netlify does, so this saves them a huge amount of money every month, and the Linux repositories are served the same way as before except now they use CloudFlare Workers and pre-computed artifacts at build time. There is a job that runs every time there is a release that makes a commit which forces the site to regenerate repository artifacts and website download links.

Being an admin on the serivces they use including GitHub, DigitalOcean, and Cloudflare makes it a lot easier to actually get infrastructure work done instead of waiting on the owner to click buttons. I appreciate the *enormous* amount of trust that has been placed in me. Right now, most of my time on that front is going into building out their Kubernetes-based build farm, managed with Flux in a GitOps repository. With this many Rust apps being built for Windows, macOS, Linux, and FreeBSD across multiple architectures, there is a lot of compiling going on, and having our own build capacity will make integration and regression testing significantly faster and more predictable.

### Shared Actions and Libraries

With this many apps, keeping every repository's CI in sync by hand doesn't scale. I created [craft-common-actions](https://github.com/storytold/craft-common-actions/), which holds the reusable workflows that every app calls for releases, Linux packaging, Flatpak OCI publishing, SonarQube Cloud scans, FreeBSD and Nix builds, and Docker image builds. When signing needed to be added to the Linux packages, it went into one place. Every app immediately benefits from improvements made here in the shared workflows.

I've been doing the same thing for code, helping extract common crates out of the individual apps and into [craft-libs](https://github.com/storytold/craft-libs). The biggest one I wrote is `craft-update`, which handles release checking, installation, and self-updating for every app. It knows not to install an update while the app has unsaved work, retries if a disk image is busy on macOS, and shows the app's own icon and accent color in the update prompt. I also added a shared `craft-window` crate so window decorations look consistent across the suite.

### The Launcher

I've done a lot of work on the [Craft Launcher](https://github.com/storytold/craft-launcher), which is the app you install to discover, install, and update the rest of the suite. I've done a lot of hardening here to make updates more reliable and added applications to the catalog as they were released, including TextureCraft, MaterialCraft, and Craft Anything as well as the community application, SolidCraft. I've also been reviewing pull requests from the community and cutting releases.

### Documentation

I also bought the domain for and architected [craft.wiki](https://craft.wiki), the documentation wiki for ArtCraft and the Crafting Apps. It's an [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/) static site with a section for each app, deployed with Cloudflare Workers Builds. I wanted people to be able to contribute without needing to know Git, so it includes a self-hosted [Sveltia CMS](https://github.com/sveltia/sveltia-cms) editor that people sign into with Discord, since that's where the community already is. *Senior Contributors* in the project can push fixes directly without the usual PR review process. The Worker handles sign-in and doesn't need a database. Each app's page on the website now has a Documentation button that links to its section of the wiki.

### Validating Mac Builds

I don't use macOS day to day, but a big chunk of the people using these apps do - also about a quarter of our install base, and it's hard to validate builds for a platform you don't have. In order to support this work, I just picked up a new M5 Max Mac Studio so I can test macOS builds before releases go out, which will hopefully catch issues before users run into them.

### Looking Forward

Rewriting a whole suite of professional creative applications from scratch is an extremely ambitious goal, and I don't know exactly where it ends up. At the very least, whatever happens with ArtCraft is going to be interesting to watch, and I'm happy to be in a position to help out. I really hope it succeeds, because if it does, one of the main reasons a lot of people have for not using Linux goes away.

If you want to try them out, the apps are at [getartcraft.com](https://getartcraft.com/), and the code is all on GitHub under [storytold](https://github.com/storytold) if you'd like to contribute.
