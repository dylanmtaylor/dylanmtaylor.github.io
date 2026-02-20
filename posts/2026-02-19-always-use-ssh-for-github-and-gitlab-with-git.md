---
date: '2026-02-19'
title: Always Use SSH for GitHub and GitLab with Git
description: A quick tip to configure Git to automatically use SSH instead of HTTPS for GitHub and GitLab repositories.
---
## Always Use SSH for GitHub and GitLab with Git

If you use SSH keys for authentication with GitHub and GitLab (and you should), you've probably run into the annoyance of accidentally cloning a repository over HTTPS. Maybe you copied the URL from your browser's address bar, or a README linked to the HTTPS clone URL. Either way, you end up being prompted for a username and password when you try to push, instead of using your SSH key.

There's a simple Git configuration trick that fixes this permanently. Git has a `url.<base>.insteadOf` setting that rewrites URLs on the fly. You can tell Git to automatically substitute SSH URLs whenever it encounters HTTPS URLs for GitHub or GitLab:

```bash
git config --global url."git@github.com:".insteadOf "https://github.com/"
git config --global url."git@gitlab.com:".insteadOf "https://gitlab.com/"
```

This adds the following to your `~/.gitconfig`:

```ini
[url "git@github.com:"]
    insteadOf = https://github.com/
[url "git@gitlab.com:"]
    insteadOf = https://gitlab.com/
```

From now on, every `git clone`, `git fetch`, and `git push` that would have used HTTPS will transparently use SSH instead. You can still copy HTTPS URLs from your browser or from project READMEs and everything will just work. This also applies to dependencies in tools like `go get` or any other tool that shells out to Git under the hood.

If you ever need to bypass this for a specific operation, you can use the `GIT_CONFIG_COUNT` environment variable to temporarily override it, but in practice I've never needed to.
