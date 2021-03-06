---
layout: post
status: publish
published: false
title: Goodbye Dropbox, Hello OwnCloud.
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2014-07-04 05:18:09 +0000'
date_gmt: '2014-07-04 05:18:09 +0000'
---
<p><a href="http://dylanmtaylor.com/?attachment_id=1143" rel="attachment wp-att-1143"><img class="alignleft  wp-image-1143" src="/images/blog/2014/07/owncloud23.png" alt="owncloud23" width="323" height="129" /></a>I've been a faithful Dropbox Pro customer for years, but at the rate they charge and the amount of storage offered,  I found it more and more difficult to justify paying $100 for 100GB of storage (well, I have 162.13GB due to referrals and promotions via Samsung). Of course, that's a lot of money for not that much space. What really made Dropbox worth it was it's fantastic sync capabilities and it's integration with ... well, almost everything. If you know me, you probably realize I love to play with software in my free time, I enjoy coding and debugging things, and I have no fear of doing something myself even if a service is available that handles it for you. So, that being said, I set out to do several things:</p>
<ul>
<li>Make a private storage solution that I have complete control over</li>
<li>Pay LESS than a Dropbox subscription for the same amount of space</li>
<li>Have all of the same syncing features offered by Dropbox, if not more features</li>
</ul>
<p>The obvious solution to this is to set up a VPS. I did a trial run of OwnCloud 7 on a 320GB VPS hosted by <a href="http://www.vultr.com/?ref=6805270">Vultr</a>, a company I highly recommend for VPS hosting including gaming servers, websites, etc. They have been great to me, and the only reason I didn't keep this VPS on <a href="http://www.vultr.com/?ref=6805270">Vultr</a> is because I got a very good deal on an OpenVZ setup albeit with less control than I would have had with KVM for the exact same price. After running the server on <a href="http://www.vultr.com/?ref=6805270">Vultr</a> for two months and deciding that OwnCloud was both fast and stable, I decided I wanted to get more bang for my buck. I found a company called ByteOnSite and signed up for not just one, but two VPS servers. It's always good to have redundancy, and I like having the extra resources. After a little bit of back-and-forth with their support staff, I had NFS and private networking with unmetered bandwidth working on my account. I used the promotional code "48AYEAR" to cut the cost of each VPS server down to $4/month. Yes, the promo code worked for both servers. At $96 a year, I was paying $3 a year less than I was paying for Dropbox's 100GB plan, but what exactly was I getting for my money? Let's take a look.</p>
<p>&nbsp;</p>
<p>Server Package 1:</p>
<ul style="color: #ffffff;">
<li style="color: #aaaaaa;">Protected Storage Level 1</li>
<li style="color: #aaaaaa;">1TB Hard Drive</li>
<li style="color: #aaaaaa;">512MB Total Memory</li>
<li style="color: #aaaaaa;">1TB Outbound Bandwidth</li>
<li style="color: #aaaaaa;">Free Inbound Bandwidth</li>
</ul>
<p>Server Package 2:</p>
<ul style="color: #ffffff;">
<li style="color: #aaaaaa;">Memory Intensive Level 1</li>
<li style="color: #aaaaaa;">1.6GB Dedicated RAM</li>
<li style="color: #aaaaaa;">3.2GB Total Memory</li>
<li style="color: #aaaaaa;">80GB Disk Space</li>
<li style="color: #aaaaaa;">2TB Bandwidth</li>
</ul>
<p>Between the two servers, I have access to:</p>
<ul style="color: #ffffff;">
<li style="color: #aaaaaa;">1.9GB Dedicated RAM</li>
<li style="color: #aaaaaa;">1.9GB SWAP Space</li>
<li style="color: #aaaaaa;">1080GB Disk Space</li>
<li style="color: #aaaaaa;">3TB Bandwidth (Outbound)</li>
</ul>
<p>This is on an OpenVZ configuration with private networking and a 1Gbps link (one link per VPS, so 2Gbps total). That's one powerful setup. With an array like this, it would be possible to do some serious number crunching, and for the purpose of hosting an OwnCloud setup with the memory intensive server running the frontend and the storage server hosting all of the files (with encryption enabled, duh), I had more than 10 times the resources given by Dropbox, as well as a server just for me with my own guaranteed resources such as CPU time and RAM. A bit overkill, but at less than the price of Dropbox, why not? Now the fun part - paying for the servers was easy, setting them up was a challenge, and I thoroughly enjoyed it and learned more about Linux administration than I ever imagined. On the storage server, I installed the CentOS 6 64-bit minimal image, which is based off of RedHat Enterprise Linux. This is because the RHEL 6 kernel is needed to host an nfsd server on an OpenVZ container. Also, I secretly wanted to play with CentOS, as my familiarity with RPM based distributions isn't as strong as my Debian-based distribution knowledge. On my memory intensive server, I decided to optimize it to use as much of it's available resources as possible to speed up the web interface and take the load off of the storage server which is very limited in terms of RAM and CPU. I installed Ubuntu 14.04 LTS 64-bit on my memory intensive server, which I will refer to as my "processing server". Once I had the servers setup, it was time to get to work.</p>
<p>On the processing server, I installed a LAMP stack with MariaDB instead of MySQL, a Varnish Cache Server for speeding up client requests and the Pound reverse proxy for enabling SSL over Varnish. In addition to that, I installed every possible dependency for ownCloud which includes the following packages:</p>
<p>software-properties-common smbclient libreoffice php5-gd* php5-intl php5-mcrypt php5-imagick libav-tools curl php5-curl</p>
<p>I also installed glances and ran byobu-enable as I typically do as it makes administration much easier. Speaking of administration, I installed Ajenti later on as it lets me keep tabs on my server's resources. I also installed the packages necessary for me to mount the NFS share from the storage server and added an IP table configuration so that it would only route traffic over my private network:</p>
<p>ip route add 10.10.200.100/32 dev venot0:1 src 10.10.200.101</p>
<p>I configured all of the services to route traffic to each other so that the data would be seamlessly sent to the client. When done, my setup looked like this:</p>
<p>Client &lt;=&gt; Pound Reverse Proxy (:443) &lt;=&gt; Varnish Cache (:80) &lt;=&gt; Apache Web Server (:8080) w/ Memcache &lt;=&gt; NFS Share (10.10.200.100)</p>
<p>On my storage machine, I created a folder at /root/owncloud and bound it to /export/owncloud and added the necessary entry to /etc/exports which allows only my processing server to touch the folder:</p>
<p>/export/owncloud  10.10.200.101(rw,nohide,insecure,no_subtree_check,async,no_root_squash,fsid=0)</p>
<p>After running exportfs -a to apply these entries, I then set up /etc/fstab on the processing server to automatically mount this folder (after testing it manually using mount -t nfs [...]). After that, it was just a simple matter of mapping the processing server to a DNS server using a type A record (IPv4 -&gt; domain) and installing OwnCloud by extracting the tarfile and creating entries in the MariaDB database. For me, this process looked something like this:</p>
<p>mysql -uroot -p[randomly generated, long root password] -e "create database owncloud;"<br />
mysql -uroot -p[randomly generated, long root password] -e "GRANT ALL ON owncloud.* to 'owncloud'@'localhost' IDENTIFIED BY '[different long randomly generated password, used for owncloud admin user]';"</p>
<p>tar -xjf owncloud-version.tar.bz2<br />
rm -r /var/www/html/*<br />
cp -R /root/owncloud/* /var/www/html<br />
chown -R www-data:www-data /var/www</p>
<p>Of course, I needed to change my OwnCloud configuration file to allow connections over my DNS mapped domain name and point my data directory that is on my NFS storage server. It was also useful to increase my PHP memory usage limit and POST size and upload limits to around 50GB. This is a terrible idea on a shared production server, but since it's my personal server, it's nice to be able to upload tons of stuff at once. My configuration for OwnCloud looks similar to this:</p>
<blockquote><p>&lt;?php<br />
$CONFIG = array (<br />
'instanceid' =&gt; '[your instance id]',<br />
'passwordsalt' =&gt; '[your password salt; don't change this]',<br />
'trusted_domains' =&gt;<br />
array (<br />
0 =&gt; '[my processing server's IP address]',<br />
1 =&gt; '[my DNS mapped domain name]',<br />
2 =&gt; '[my DNS mapped domain name]:6081',<br />
),<br />
'datadirectory' =&gt; '/owncloud/data',<br />
'dbtype' =&gt; 'mysql',<br />
'version' =&gt; '7.0.0.2',<br />
'dbname' =&gt; 'owncloud',<br />
'dbhost' =&gt; 'localhost',<br />
'dbtableprefix' =&gt; 'oc_',<br />
'dbuser' =&gt; 'owncloud',<br />
'dbpassword' =&gt; '[the password from that earlier mysql query]',<br />
'installed' =&gt; true,<br />
'forcessl' =&gt; true,<br />
);</p></blockquote>
<p>Once that was all set up, the very first thing I did was enabled the "Encryption" plugin as well as "Tasks" and "Bookmarks". After that, I was able to upload to it, and everything worked beautifully. Hopefully this is helpful for someone wanting a similar setup. After all, once this is setup, it's almost no-maintenance.</p>
