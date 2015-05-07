#!/bin/bash
#First build the static content for the website
python build_site.py
#For some reason jekyll does not allow symlinks. To get around this we simply copy files
cp -v interface/* blog/_includes/
#Finally, build the blog
cd blog/
jekyll build
#Now clear memcache
if [ -e "/bin/nc" ]
then
    echo 'flush_all' | nc localhost 11211
fi
