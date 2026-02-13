---
date: '2026-01-03'
title: Building Our Wedding Website with Cloudflare Pages
description: How I built a wedding website from scratch using vanilla HTML, CSS, and JavaScript, hosted on Cloudflare Pages with a custom domain from Cloudflare Registrar.
---
## Building Our Wedding Website with Cloudflare Pages

I'm getting married! On Christmas morning 2025, I proposed to my girlfriend Kayelin, and she said yes. We've been together for eight years now, having met through OkCupid back in 2017, and we're making it official on February 20, 2027 -- exactly ten years after we first met.

Naturally, as an engineer, I couldn't resist the urge to build our wedding website from scratch rather than using one of the many wedding website services out there. What started as a simple landing page turned into a surprisingly involved project with nearly 200 commits over the course of a week.

### Why Build It Myself?

When we first got engaged, I did what most people do -- I checked out the popular wedding website builders. The Knot, Zola, Minted, WithJoy, and a handful of others. They're polished, they're easy, and they have all the features you'd expect: RSVP management, registry integration, photo galleries, the works.

I will admit that The Knot actually had some beautiful illustrations of a winter branch clipart featuring evergreen Christmas decor that I liked. The artwork on the website I built is inspired by this -- I used Gemini to describe this image and then ran the description through nano banana to generate a legally distinct but similar version in a watercolor style. It ended up looking beautiful and I don't have to worry about using their artwork without permission since it's a freshly generated image (I have this on the background of the currently live site in the top right corner and rotated 180 degrees in the bottom left as well, to frame the page.) 

But after spending an evening clicking through templates, I found myself frustrated. Every template felt... the same. You pick a theme, swap in your photos, change the colors slightly, and end up with something that looks like every other wedding website. The customization options were surface-level at best. Want to tweak the layout? Too bad. Want to add a section that doesn't fit their predefined structure? Not happening. Want to remove their branding or avoid upselling guests on registry partnerships? Good luck. I kept thinking "I could build this myself and have it look exactly how I want."

I wanted something that felt personal, not a template with our names plugged in. I wanted full control over everything. As an example, I wanted to add a snowfall effect because we got engaged on Christmas morning and the wedding will be in Winter. I wanted to be able to support having a German translation for Kayelin's family that lives in Germany, without relying on a Google Translate widget on the website. I wanted to be able to make a page with payment options for our honeymoon fund that didn't take a cut of donations. I wanted to be able to have a /save-the-date URL with a digital copy of our save the date cards so we could send them to people prior to the physical copies being mailed out.

I already have experience dealing with web design and DebOps, and I am already using Cloudflare for dylanmtaylor.com. I went with Cloudflare Pages because hosting a static site on Cloudflare Pages is completely free -- unlimited bandwidth, automatic deployments from VCS, global CDN. It's an awesome service that I can't recommend enough.

So I did what any engineer with more enthusiasm than free time would do: I opened VS Code and started from scratch.

### The Tech Stack

I kept things intentionally simple: vanilla HTML, CSS, and JavaScript -- no frameworks, no build tools, no npm dependencies. The entire site is static HTML files that Cloudflare serves for me.

### Getting Started

The initial commit was pretty bare bones -- a basic landing page with our names, the date, and some placeholder sections. From there, I started iterating. 

One of the first things I added was a snowfall effect using JavaScript. I used Kiro to help write this code, as I'm currently playing around with it. It's an awesome tool that easily acts as a force multiplier for engineers, and I believe in working smarter, not harder. The trick is writing the prompt correctly, and it took quite a few attempts to get something that visually looked the way I wanted.

Since we got engaged on Christmas and the wedding is in February, a subtle winter theme felt appropriate. The snowflakes are absolutely positioned divs that animate down the screen with randomized sizes and speeds, and I added a glowing effect to make them pop against the background. Try doing that with The Knot.

### The Countdown Timer

I feel that every wedding website needs a countdown timer, so I added one that shows days, hours, minutes, and seconds until the ceremony. The JavaScript is straightforward -- calculate the difference between now and the wedding date, then update the DOM every second. I also added logic to hide the countdown after the wedding date passes, since showing negative days would make no sense.

### Cloudflare Pages Setup

Setting up Cloudflare Pages was trivial. I connected my private Git repository, and Cloudflare automatically deploys on every push to the main branch. Since there's no build step (it's all static files), the deployment is nearly instantaneous. I can often commit and hit Ctrl+Shift+R in Chrome and see live changes in seconds.

I already had my personal domain on Cloudflare from [when I moved my DNS there back in 2021](/posts/2021-10-15-cloudflare_domain_registrar_and_terraforming_my_dns), so registering a new domain for the wedding was easy. Cloudflare Registrar charges at-cost pricing with no markup, so the .com was around $10 for the year. I also added a `_headers` file for security headers that Cloudflare Pages picks up automatically.

### The Honeymoon Fund Page

Instead of a traditional registry, we decided to set up a honeymoon fund. Truthfully, I have far too much respect for our friends and family to create a list of things that we either don't need/want or would end up returning (which would just be insulting). I looked through over 30 pages of the registry at The Knot, and saw maybe a dozen things we'd possibly use, and they were largely upgrades of things that we already have. Why replace perfectly good items for the sake of having a registry? Do I really need to replace my vacuum cleaner, cutting block, or patio furniture? No, that's wasteful. Instead, Kayelin and I agreed to simply ask for cash and use it to help cover the cost of the wedding and honeymoon trip or a nice dinner or something. So, in lieu of a registry, I created a page with multiple payment options -- Cash App, Zelle, PayPal, Venmo, and Wise for international guests. Each option has a QR code that guests can scan for convenience.


### Adding German Translation Support

Kayelin's family has German roots on her father's side, and multiple relatives speak German as their first language. We're inviting about a dozen Germans to the wedding. I wanted to make sure they could read the site comfortably, so I added translation support.

Rather than just using a Google Translate widget, I built a simple client-side translation system. The site stores pre-made translations in a JSON file, and a JavaScript function walks the DOM looking for text nodes that match translation keys. A floating button lets visitors toggle between English and German, with the preference saved in a cookie.

Because the translations are cached in memory the second the page loads and no external requests are needed, it's extremely responsive.

### Image Optimization

I spent some time optimizing images for performance. The photos are served in WebP format for smaller file sizes, and I used tools like `pngquant` and `optipng` to compress PNGs. I also tried to use SVG wherever it made sense for some graphics, though getting them to render consistently across browsers (especially iOS Safari) took more iteration than expected.

### Photo Gallery

I added a photo gallery page for engagement photos and eventually wedding photos. The gallery uses CSS Grid for the layout and a simple lightbox implementation in vanilla JavaScript. Clicking a photo opens it in a modal overlay with navigation arrows.

The photos themselves are hosted on a subdomain to keep the main repository size manageable - committing photos to VCS doesn't make sense. The subdomain is wired up to a public Cloudflare R2 bucket.

### What's Next

The site is live and functional, but I'll keep iterating as we get closer to the wedding. I still need to enable the RSVP form (I have a Google form that is currently disabled until we get closer to event), and I'll add more photos after the engagement shoot.

Building this site was a fun side project that combined my love of web development with something personally meaningful.AIf you're curious, the wedding will be at The Pavilion at the Angus Barn in Raleigh, NC. It's a beautiful venue, and we're excited to celebrate with family and friends.
