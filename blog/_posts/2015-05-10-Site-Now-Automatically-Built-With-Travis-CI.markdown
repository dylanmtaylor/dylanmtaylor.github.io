---
layout: post
title: Site Now Automatically Built With Travis CI
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2015-05-10'
---

![Travis CI](/images/blog/2015/05/TravisCI-Full-Color.png  "Travis CI") In order to simplify the publication of content and have this site automatically build whenever I publish a change to Git, I have set up a script and integrated my GitHub repository with [Travis CI](https://travis-ci.org). By doing so, I can simply focus on the content, and using the scripts that I wrote, the site will build and publish itself. Because I have a cron job setup on the dylanmtaylor.com domain, every change I push to Git is automatically pulled and deployed almost instantaneously, so that my content is up to date. 

The setup for this is actually pretty simple, although it took me a few tries to figure it out -- first and foremost, there is now no longer a build.sh in the repository's main directory. This file was previously used to manually build and copy the files for Jekyll as well as clear memcached's cache when I rebuilt the site so that nginx would always be serving the latest content. The lines that were in that file were manually copied to a .travis.yml file which will build the site automatically and push the changes to GitHub as me, with a "built from [commit]" line as the commit message. Before building the site, the script downloads and installs the ruby development libraries into the Travis build environment and installs jekyll using Ruby gems. 

Once the build environment is setup properly, the script will build all the non-blog static content by running my build-site.py, which is custom Python code and then run commands very similar to the build.sh script which I was manually running previously. Then, using a secure string, Travis will use a GitHub token associated with my account and push the built content to GitHub. This is then pulled automatically onto dylanmtaylor.com using the aforementioned cron job.