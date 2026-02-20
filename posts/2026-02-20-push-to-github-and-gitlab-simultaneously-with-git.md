---
date: '2026-02-20'
title: Push to GitHub and GitLab Simultaneously with Git
description: A neat Git trick to configure multiple push URLs on a single remote so you can mirror your repositories with every push.
---
## Push to GitHub and GitLab Simultaneously with Git

If you're like me and you maintain mirrors of your repositories on both GitHub and GitLab, you've probably gotten used to running `git push` twice or writing a shell alias to push to both. There's a cleaner way built right into Git that most people don't know about: multiple push URLs on a single remote.

### Setting It Up

Say your `origin` remote points to GitLab and you want to also push to GitHub. You can add a second push URL like this:

```bash
git remote set-url --add --push origin git@gitlab.com:dylanmtaylor/myrepo.git
git remote set-url --add --push origin git@github.com:dylanmtaylor/myrepo.git
```

The order here matters. The `--add --push` flag creates a separate push URL list for the remote. Once that list exists, Git stops using the fetch URL for pushes. So the first command ensures your original GitLab URL is still a push target, and the second adds GitHub alongside it.

After running these commands, `git remote -v` will show something like:

```
origin  git@gitlab.com:dylanmtaylor/myrepo.git (fetch)
origin  git@gitlab.com:dylanmtaylor/myrepo.git (push)
origin  git@github.com:dylanmtaylor/myrepo.git (push)
```

### How It Works

Now every `git push origin` pushes to both URLs sequentially. Pulls and fetches still come from the single fetch URL, so your primary host remains the source of truth. There's no risk of merge conflicts between the two — they always receive the same commits at the same time.

This is especially useful when combined with CI/CD. In my case, GitLab is used to deploy to my production Kubernetes cluster, while GitHub Actions builds and deploys to GitHub Pages as a mirror. One push triggers both pipelines.

It's a small configuration change, but it completely eliminates the "forgot to push to the mirror" problem.
