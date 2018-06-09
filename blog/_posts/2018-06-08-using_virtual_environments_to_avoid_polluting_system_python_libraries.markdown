---
layout: post
title: Using Virtual Environments to Avoid Polluting System Python Libraries
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-06-08T20:41:12-04:00'
---

As a Python developer, it's incredibly common to install a new library using the `pip` tool. However, if you are running Linux, one of the issues you can get with this is that you can overwrite system python libraries that are managed by a package manager such as `apt` or `yum`. In addition, if you have several Python projects on your system, each requiring a different version of a dependency, it's possible that one might break the other. Enter `virtualenv`, a tool used to isolate python dependencies within a project (or just in any folder, really). virtualenv allows you to install Python packages in a standard manner using pip, but keeps them separate from the rest of the system.

Assuming you have Python and [pip](https://pip.pypa.io/en/stable/installing/) installed, you can install virtualenv by running this command as root:

```
pip install virtualenv
```

This will install the `virtualenv` command. Once you have this, you can create a virtual environment for your project. Running the command `virtualenv [destination folder]` in will create a folder in the current directory that contains a virtual environment with a complete copy of Python (so you can standardize on one version), as well as a copy of pip which can be used to install any additional packages desired. Advanced use includes having a different version of python included in the environment using the -p flag and the location of the python binary as an argument. Once you have your virtual environment created, you need to source the `bin/activate` file within the virtual environment's folder. Then you can proceed to install whatever you want with `pip`. Finally, when you want to leave your virtual environment, you can simply run `deactivate`.
