---
layout: post
title: Automated Deployment Testing With Chef InSpec
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2020-06-13T14:38:53-04:00'
---

[![](<img src="/images/blog/2020/06/inspec.png" width="33%" style="float:left" />)](https://www.inspec.io/)A good practice for any automated build system is integration testing. Chef InSpec provides a way to handle integration testing by checking properties of resources and comparing the actual value to a declared "correct" value. By doing so, after a deployment is complete, it can run through a suite of tests and validate that everything is the way that it should be. There are numerous resource types that InSpec supports and I've used professionally, such as checking if packages are installed, if a configuration file contains a certain line, or if a port is open and, for example, java is the process listening on that port. For the longest time, since this site was created, I basically loaded up the site's resources in a browser after running my Ansible playbook, and if everything looked good enough, I considered it successfully deployed. This is, after all, a pretty simple deployment. But, that said, I'd be a lousy DevOps engineer if I didn't take every opportunity to automate testing processes and reduce toil as well as catch blatant errors automatically when Ansible is run on a weekly schedule to enforce desired state.

Most of these InSpec resources are designed to be run on the system you're testing, but for web applications the [http resource](https://www.inspec.io/docs/reference/resources/http/) is perfect for testing if the web application (or static content in this case) is being served correctly by retrieving the specified URLs on an external machine. For instance, the following tests will run correctly regardless of what machine they are run on and are a good indication if things are up and running:

``` rb
# Check site is up and HTTP -> HTTPS works
describe http('http://dylanmtaylor.com/') do
  its('status') { should cmp 301 }
end

# Check that site is being served correctly on root and www DNS
describe http('https://dylanmtaylor.com/') do
  its('status') { should cmp 200 }
  its('body') { should match /Dylan M. Taylor/ }
end
```

The first test validates that HTTP traffic is getting redirected to HTTPS, and the second test ensures that the main website is being served with a 200 status code and that the string "Dylan M. Taylor" is contained in the body. While these tests are super basic, if these tests pass, I can be pretty certain that the server is up and *my content* is being served as opposed to an error page. I'm publishing the full suite of tests as the [dylanmtaylor-inspec project on GitLab](), but most of the other tests are similar to the above examples for now. That said, these tests do not need to be complicated. Simple tests like these will catch the vast majority of issues with a real deployment.

I leverage the official Chef InSpec Docker container to run the tests from GitLab CI/CD. I did have to make a few modifications to how the image was invoked as the entrypoint in their provided image is the inspec binary, not a shell interpreter. Their image is based off of ruby alpine, which uses busybox, so after a little digging, I discovered that if I just set the endpoint on the image, I can run my own inspec command through GitLab CI/CD, as if I were running it on my computer:

``` yaml
image:
  name: chef/inspec:latest
  entrypoint: ["/bin/busybox"]
```

I also had to set a variable to indicate that I accept Chef's license agreement for the build to start:

``` yaml
variables:
  CHEF_LICENSE: "accept"
```

After that, I could just run my InSpec profile via a GitLab CI stage:

``` yaml
test_deployment:
  stage: test
  script:
    - inspec exec dylanmtaylor/profile
```

In case you're not aware GitLab has a feature called "multi-project pipelines". Basically you can trigger one pipeline from another as a downstream build. I currently run [my Ansible playbook](https://gitlab.com/dylanmtaylor/dylanmtaylor-ansible) against my webserver on a weekly cadence. As a finishing touch, I decided to configure the InSpec tests to be triggered as a downstream build of the Ansible playbook, so as long as Ansible doesn't report a failure and exit out, InSpec will be triggered as a final validation that everything is okay, which in the event of failure will notify me via GitLab that the InSpec build failed. This is actually very easy to do. I added a new job in a test stage that runs after the deployment. In the Ansible project, this looks like:

``` yaml
inspec:
  stage: test
  trigger:
    project: dylanmtaylor/dylanmtaylor-inspec
    branch: master
```

No changes were needed in the InSpec project to enable this functionality.