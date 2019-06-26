# Dylan M. Taylor's Personal Homepage

Current build status: [![pipeline status](https://gitlab.com/dylanmtaylor/dylanmtaylor.gitlab.io/badges/master/pipeline.svg)](https://gitlab.com/dylanmtaylor/dylanmtaylor.gitlab.io/commits/master)

## About this repository

I decided to scrap my WordPress blog and recreate my whole site from scratch, publishing it all to GitLab for others to study and learn from. I'm using Jekyll for blogging, and the rest of the site is using code that was written by hand. This repository contains the complete source code for my website, which is automatically built by GitLab CI when I make a new commit. The production server powering dylanmtaylor.com automatically retrieves this successful build, and uploads it to the correct directory for it to be served by nginx. 

The entire dylanmtaylor.com site is automatically provisioned using a custom Ansible playbook, which configures the entire server on a minimal Linux image. The playbook I'm using in production is open soure and is available at https://gitlab.com/dylanmtaylor/dylanmtaylor-ansible. HTTPS is enabled domain-wide on dylanmtaylor.com using CloudFlare's flexible certificate feature as well as redirection rules to direct HTTP requests to HTTPS.
