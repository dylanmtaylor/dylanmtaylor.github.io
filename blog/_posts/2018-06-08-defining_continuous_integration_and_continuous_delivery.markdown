---
layout: post
title: Defining Continuous Integration and Continuous Delivery
status: publish
published: true
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2018-06-08T15:23:06-04:00'
---

In the past, I've been asked what continuous integration and continuous delivery mean to me. Those not used to the DevOps Engineering methodology, which integrates traditional application development with infrastructure operations in order to expedite the production code delivery process and improve iteration time in an agile manner may not be familiar with these terms. Unlike the word agile, which is overused to the point where it has become little more than a marketing buzzword in some cases, CI/CD refer to concretely define processes. The implementation may vary, of course, for instance, a CI/CD workflow could take advantage of a hosted solution (software as a service) such as TravisCI, or IBM Bluemix DevOps Services (a product I've worked on), or it could run within one's own infrastructure.

Integration testing is defined as testing the software modules as a group, and tends to mean testing the product as a whole instead of specific functionality, unlike unit tests which can be at the function level. Continuous integration is a practice where integration testing is done frequently, perhaps multiple times in a single day. For instance, when members of the team developing the product commit their work to a repository, via a pull request (called a merge request in GitLab), an automated build process is initiated. It could instantiate a Docker container or Jenkins job in order to build the product with the revised source code, but the specific solution doesn't matter in this case. Once the product is built, the test suite is run against it and feedback is provided via predefined channels in a way that errors can be quickly detected so that bugs are not introduced into the codebase.

Continuous delivery takes this one step further. Once continuous integration is in place, it's just one of the pieces of a continuous delivery workflow. CD takes advantage of the constant testing of the product and allows the development changes to quickly get pushed from development to a test environment, and then to production. This typically involves what's called a 'delivery pipeline', which is a service that orchestrates the promotion of code from one 'stage' to another. Each stage represents an element of the delivery process, such as building or deploying to an environment. Continuous delivery strongly relies on a good delivery pipeline. In a proper setup, new product features and bug fixes can be built and deployed from one stage to another rapidly without accepting a great deal of risk. However, it is of utmost importance that there are sufficient integration tests as well as good code coverage by unit tests in the product in order for this process to work effectively. By taking advantage of a CI/CD workflow, either using off the shelf tools or implementing a custom solution, it is possible to significantly speed up the code delivery process and reduce ceremony.