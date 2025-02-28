---
date: 2018-04-30
title: Checking What IP Addresses Connected to Your Nginx Server
description: Learn how to analyze Nginx access logs to identify IP addresses connecting to your server using command-line tools like awk, sort, and uniq.
---

My server is behind a [CloudFlare](https://www.cloudflare.com) caching proxy, so it usually doesn't get hit with requests directly, but I was noticing thousands of unique IP addresses looking for files such as `/xampp/phpmyadmin/index.php` and `/db/index.php`. These are probably hackers using automated vulnerability scanners against anything that has an open HTTP connection on the internet. I got curious where these requests were coming from, so I decided to dig through the logs.

The first thing I did was connect to my server using the hostname I have in my `/etc/hosts` file for convenience through the GNOME file browser. I entered `sftp://root@dylanmtaylor/var/log/nginx` as the connection string. I then copied all the access log files to my local machine into a temporary NGINX folder.

From there, I ran this commmand:

``` bash
for file in $(ls *.gz); do gzip -d $file; done
```

This decompressed all of the gzipped log files by taking the output of `ls *.gz` and iterating through the files to run `gzip -d` on each one. For usage information on `gzip`, you can run `gzip -h`
In order to combine the log files into one for easy parsing, we can use `cat`, which is short for concatenate. `cat access*.log*` works effectively for this.

Using UNIX input redirection, we take the output of the `cat access*.log*` command and redirect it to the standard input of the awk process. One really useful trick of awk is to print a specific argument to it, like `'{print $1}'` which will give you the first column of output. You can change the `$1` to the column number of the input desired for automated parsing. I then piped that to `uniq -c`. uniq is a utility that will find unique entries. The `-c` argument simply shows the count -- how many times each occurence showed up. Finally, because these are in no particular order, I yet again piped the output to `sort -nr`. The `-n` flag simply tells sort to compare based on numerical value. By default, these values are ascending (112 vs 64 would have 64 first). Because I want them in descending order, I added the `-r` flag, which puts the ones that show up the most at the top of the list. Finally, I use `tee` to store the results as `ip-addresses`. The whole command looks like this:

``` bash
awk '{print $1}' <(cat access*.log*) | sort | uniq | sort -nr | tee ip-addresses
```

I then tried to use [a bulk IP address lookup tool](https://www.infobyip.com/ipbulklookup.php) to check where these requests were coming from. Unfortunately, they have a limit of 100 IP addresses and they want the list to be space/new line delimited. Fortunately, there is a way to find the worst offenders. The list is already sorted descending, so I can take advantage of the `head` tool with the `-n 100` argument, which just takes the first 100 lines of the file or standard input and redirects it to standard output.

Because I saved my output as `ip-addresses`, I was able to simply cat this file to the necessary utilities with `cat ip-addresses | head -n 100 | awk '{print $2}'`, but UNIX pipes are pretty flexible. The whole thing can be done in one line like so:

``` bash
awk '{print $1}' <(cat access*.log*) | sort | uniq | sort -nr | head -n 100 | awk '{print $2}'
```

Naturally, I found my own IP address and several IP addresses belonging to CloudFlare, which is expected, but I also found hits from assorted IP addresses all over the world, excluding the CloudFlare mirrors (which are in several countries), from the United States, Canada, Indonesia, China, Hong Kong, Seychelles and Russia. From this data, it is hard to easily tell which ones are malicious, and which stumbled upon the IP address, but it is fascinating to see how geographically distributed the requests to a site as small as mine are.