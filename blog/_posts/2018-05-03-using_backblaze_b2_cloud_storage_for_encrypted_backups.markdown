---
layout: post
title: Using BackBlaze B2 Cloud Storage for Encrypted Offsite Backups
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-05-03T21:04:33-04:00'
---

As of right now, one of the cheapest offsite backup solutions by far is [BackBlaze B2](https://www.backblaze.com/b2/cloud-storage.html), with [Amazon S3](https://aws.amazon.com/s3/) trailing behind. For a while now, I've been using this solution with a piece of software called [restic](https://restic.net/) to store encrypted backups of some of my important documents offsite. By doing so, should my Western Digital 8TB external hard drive (which I currently use for all of my backups) fail, or get stolen (it's strongly encrypted, so my data is safe), I have a solution to get the files I need the most back. While I store anything and everything on my external, I am limiting the files in the offsite backup to things that are important. It's not economical to push things like your music/movie collection, Linux ISOs and virtual machine hard drive images to the BackBlaze cloud. Ubuntu's repositories contain the restic binaries, but other distributions may require you to install a new repository or build from source. I could write up a guide on how to set this up, but [Fedora Magazine](https://fedoramagazine.org/) wrote [an excellent article on how to setup this exact solution](https://fedoramagazine.org/use-restic-encrypted-backups/).  I'd be doing anyone reading this a disservice trying to write up an article that better explains the setup steps. If you're not a huge fan of restic, [duplicity](http://duplicity.nongnu.org/) also supports BackBlaze B2, and is fairly easy to setup from what I hear.
