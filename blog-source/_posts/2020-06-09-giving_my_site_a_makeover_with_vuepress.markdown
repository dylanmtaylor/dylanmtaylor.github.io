---
layout: post
title: Giving My Site a Makeover with VuePress
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2020-06-09T20:10:47-04:00'
---
<a href="https://vuepress.vuejs.org/"><img src="/images/blog/2020/06/vuepress.png" alt="VuePress" width="250px" height="115px" style="float:left"/></a>For years, since this site was created, I've been using [a design that I created myself](/images/blog/2020/06/vuepress.png) using basic HTML and CSS, with a bunch of custom python to put the pieces of the site together and render static HTML pages. And that actually worked really well for a long time. I had tons of flexibility and honestly, the end-result was pretty decent. Unfortunately though, it meant that all of the work of, for instance, making sure that mobile device browsing was a good experience fell on my hands. This meant, for instance that the navigation bar I made for my website had to be dynamically removed when viewing my blog on mobile so that the content was actually readable, using JavaScript based on device type detection. Maintaining this sort of logic in my code-base was a lot of effort, and the result produced wasn't as good as using a community supported framework.

So, a few nights ago, I set out to rewrite all of it. I've been exposed to VuePress via using it for internal documentation sites at work in the past, and I must say, the sheer ease of doing almost everything with markdown and CSS was definitely alluring. The main pages, outside of the blog content were absolutely trivial to convert from HTML to markdown, and the payoff was instantaneous. I then focused on working on [custom CSS styling](https://gitlab.com/dylanmtaylor/dylanmtaylor.gitlab.io/-/tree/master/.vuepress/styles) so that I'd maintain some of the cool look that I designed in the past. I am very pleased with how it came out, and I got search functionality for free via VuePress already implementing it.

Then, of course there was the blog. I had a few issues here:

* I was already publishing via Jekyll
* Converting to Vue for the blog would take me time
* I wanted to maintain the same index page
* I needed to have all of my old links work
* I did not want to have to edit tons of Markdown files in order to get it to build

Originally I started trying to deploy the VuePress blog plugin, but I decided it would take a lot of time and effort to do this. I came up with a way to basically use Jekyll to generate content and then move it to a .md file so that VuePress would render it into the blog pages (inline HTML works in VuePress, to a point).  I took my templates and removed as much HTML as possible to essentially use Jekyll to generate Markdown, and I had to do a little bit of tweaking with `sed` to change the formatting to make it look good. I also needed to trim leading whitespace so that VuePress wouldn't interpret the HTML code as an inline code block in Markdown, but at least for a temporary solution until I port it all over to Vue, I'm pleased with how it turned out. I do a regular Jekyll blog build just like before in one stage of GitLab CI/CD with a few lines of code to fix up the output:

```
- find . -name "*.html" -exec sh -c 'cat "$1" > "${1%.html}.md"' _ {} \;
- sed -i 's/<h1>Blog Posts<\/h1>/\n## Blog Posts/g' index.md
- sed -i -e 's/^[ \t]*//' index.md
```

I render from `blog-source` to `blog`, and output `blog` as a build artifact that gets passed into the VuePress build, and I then have VuePress take it from there. Eventually, I plan on redoing the blog so that Jekyll isn't needed at all as Markdown -> HTML -> Markdown with embedded HTML isn't exactly elegant at all, but it's definitely what you might call MVP, or minimal viable product. It's good enough for now, and it meets my needs.
