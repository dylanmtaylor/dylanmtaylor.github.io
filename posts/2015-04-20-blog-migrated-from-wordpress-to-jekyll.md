---
layout: post
title: Migrating from Wordpress to Custom Code and Jekyll
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2015-04-20'
---

[![Jekyll](/images/blog/2015/04/jekyll.png)](http://jekyllrb.com/)

If you haven't noticed, I recently recreated everything you see on this website from scratch. I decided to make my own layout and serve static content using LEMP rather than simply relying on the WordPress CMS in order to generate content. This make more sense from a coding perspective, as it gives me much more control over the content on my website. In addition, I made the decision to open source everything on this entire site,  [publishing it all to GitHub](https://github.com/dylanmtaylor/dylanmtaylor.github.io) for anyone who wants to study, use, or comment on the site. In addition to this system being more secure as I am no longer concerned with WordPress vulnerabilities, it's _much_ faster. This is because the server is no longer rendering anything using PHP, but rather serving code that was pre-generated using the _jekyll build_ command in my blog directory and then pushed into the repository. I'm also taking advantage of Instant Click for prefetching still, which makes pages load almost as soon as the link is clicked on. It took me a while to migrate all of the old content that was on my WordPress blog, but very little if any actual content was lost, and I manually copied in all of the old images. The new design should be much more pleasant to use, and I plan on adding many more features over time, such as possible mobile device support. Stay tuned for more updates!
