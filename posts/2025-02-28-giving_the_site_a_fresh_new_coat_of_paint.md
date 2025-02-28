---
date: '2025-02-28'
title: Giving the Site a Fresh New Coat of Paint
description: Rebuilding my website from the ground up with VitePress and a custom theme.
---

I'm excited to announce that I've recently completed a significant overhaul of this website! What you're seeing now is the result of a complete rewrite, built from the ground up using VitePress. Previously, this site was using VuePress, and instead of a proper blog plugin, I had a shimmed together solution where I generated the old content with Jekyll and then pushed the result into the built files from VuePress. This was an ugly hack. Now, all of the content is built with a single command, using a proper system, and everything is better because of it.

The process of migrating to VitePress was both challenging and rewarding. I started by setting up a new project and configuring the basic structure.  Then, I began the task of transferring all my existing content. This involved editing all of my existing Markdown files to have a new frontrunner format so that the content would properly render. I used a combination of Copilot in VS Code and Claude Sonnet 3.7 to automate writing descriptions and editing the frontrunners for each post.

One of the key aspects of this rebuild was enabling proper blogging functionality. While VitePress is excellent for documentation and static pages, it doesn't come with built-in blogging features out of the box. To achieve this, I decided to use and heavily modify the excellent [VitePress Theme Blog Pure by FangYing](https://github.com/airene/vitepress-blog-pure).

This theme provided a solid foundation, offering a clean and minimalist design. However, I wanted to tweak it a bit to meet my needs. This involved:

* **Customizing the layout and styling:**: I tweaked the CSS to have my desired look and feel. I had a bunch of styling on the old site I really liked and tried to get a somewhat similar look. This is an ongoing proess.
* **Making the blogging functionality a subpage**: By default on the Blog Pure theme, blogging is the sole functionality of the site. I modified a lot of the code so that it supported being on the 'Blog' subpage of the website

This project has been a great learning experience, and I'm now more comfortable with how this is built and my ability to maintain this website. It's great to finally be on a modern framework, and have the whole site built with a single command (`npm run build`).