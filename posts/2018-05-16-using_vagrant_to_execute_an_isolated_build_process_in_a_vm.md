---
layout: post
title: Executing a Build Process in a VM Using Vagrant Shell Provisioning 
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-05-16T18:23:38-04:00'
---

[Vagrant Shell provisioning](https://www.vagrantup.com/docs/provisioning/shell.html) is an incredibly useful tool that can be utilized to run any arbitraty code within a virtual machine. It's one of the fundamental ways of using Vagrant, and is by far one of the simplest. [Vagrant boxes](https://app.vagrantup.com/boxes/search) are preconfigured virtual machine images, usually either a bare operating system or with some sort of software installed, for instance a LAMP stack. You can do anything you can do on a regular virtual machine with a Vagrant installed one, and Vagrant also allows you to do arbitrary port forwarding from the virtual machine to the host. This is incredibly useful in the case of wanting to deploy software to a virtual machine without having to configure it, and is great for development and testing. Another use that I learned of is using Vagrant to run a build process on a version of an operating system different than the host OS on your development workstation, and then pulling the built files off of the VM via SSH. This could be useful for a packaging scenario. Since a single Vagrantfile can contain multiple VMs, you can use this to target, for example a few Linux distributions (e.g. Ubuntu, RHEL, SLES) and Windwows all in a single action. This could speed up the testing process, as each virtual machine would automatically be able to deploy and run your code and you can run integration tests against them concurrently, perhaps by forwarding each VM to a different network port, in order to do software quality assurance.

A very basic example using [VirtualBox](https://www.virtualbox.org/) as a hypervisor looks like the following:

```
# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Here we configure the resources allocated to the virtual machine
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048"]
    vb.customize ["modifyvm", :id, "--cpus", "4"]
  end

  # This section tells Vagrant where to find the virtual machine image, and what ports to forward
  # The ubuntu.vm.provision line tells the VM to execute the shell script found on the defined path
  config.vm.define "ubuntu", primary: true do |ubuntu|
    ubuntu.vm.network :forwarded_port, guest: 80, host: 8080
    ubuntu.vm.box = "ubuntu/xenial64"
    ubuntu.ssh.forward_agent = true
    ubuntu.vm.provision "shell", path:"scripts/ubuntu_provision.sh"
  end

  # Additional build targets can be defined here, e.g. RHEL, Windows Server.

end
```

In this case, the shell target is relative to the current working directory in the project. An old friend of mine recently wanted to try playing with Wordpress, and asked me for help setting it up. As an example here, because writing software to test is outside the scope of this post, I will be using Vagrant to deploy Wordpress to Ubuntu. In order to do this, I'll be using [the WP-cli tool](https://make.wordpress.org/cli/handbook/quick-start/). The file `scripts/ubuntu_provision.sh` from the Vagrantfile will look like this:

```
#!/bin/bash

# Install LAMP Server non-interactively
DEBIAN_FRONTEND=noninteractive apt-get -q -y install lamp-server^

# Cleanup and install WP cli tool
rm -rf /var/www/html/* # remove existing Apache files
cd /var/www/html
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

# Disable MySQL security for simplicity here; a proper installation would be configured with mysql_secure_installation
systemctl stop mysql.service
mkdir -p /var/run/mysqld; chown mysql:mysql /var/run/mysqld; mysqld_safe --skip-grant-tables &

# Setup Wordpress
wp --allow-root core download
mysql -uroot -e "CREATE DATABASE wordpressdb; GRANT ALL PRIVILEGES ON wordpressdb.* TO 'wordpressuser'@'%' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"
wp --allow-root config create --dbname=wordpressdb --dbuser=wordpresssuser --dbpass=password --dbhost=127.0.0.1 # Generate wp-config.php
wp --allow-root core install --url=localhost --title="Example" --admin_user=admin --admin_password=Passw0rd --admin_email=me@myself.org

# Handle services
systemctl enable mysql
systemctl reload apache2

```

Because of the [forwarded port configuration](https://www.vagrantup.com/docs/networking/forwarded_ports.html), this will enable the Wordpress installation on the guest to be accessible via port 8080 on the host machine. To test this, you can create the file structure described, run `vagrant up` in the directory containing the Vagrant file, and browse to localhost:8080 in your browser. If you decide to use this, please keep in mind that this dev install of wordpress is insecure in many ways.
