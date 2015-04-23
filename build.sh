#!/bin/bash
#First build the static content for the website
python build_site.py
#Copy home to index.html
#cp pages/full/home/index.html index.html
#Finally, build the blog
cd blog/
jekyll build
