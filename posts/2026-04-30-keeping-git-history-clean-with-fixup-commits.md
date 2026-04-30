---
date: '2026-04-30'
title: Keeping Git History Clean with Fixup Commits
description: An introduction to using git commit --fixup and interactive rebase with autosquash to maintain a clean commit history.
---

## Keeping Git History Clean with Fixup Commits

If you contribute to a project with strict code review standards, you've probably run into this situation: you submit a pull request with a beautifully crafted commit history. The reviewer leaves feedback asking for a few minor changes, such as fixing a typo, updating a variable name, or adding a missing dependency. 

Your initial instinct might be to just make the changes and run `git commit -m "address PR feedback"`. Alternatively, you might be tempted to use `git commit --amend` and immediately force push. Suddenly your history is polluted with commits like "fix variable initialization", "add unit tests", and "address code review feedback". While you could do a standard interactive rebase to manually squash these into the right places, it gets tedious if you have multiple commits in your branch.

I recently found myself in this situation while working on a new headlamp package for NixOS, where I've been asked to separate the pull request into three logical components to make maintaining the pieces easier. To do this, I made one commit per component. However, I found that a lint check requested that I "Please enable `__structuredAttrs = true;` in pkgs/by-name/he/headlamp/package.nix.", for each package I am trying to add. Recreating the history via interactive rebase can be really tedious. 

Fortunately, there is a much bette way to handle this using `git commit --fixup` and `git rebase --autosquash`. This workflow allows you to mark small corrections for specific previous commits.

### An example of using --fixup

Let's say you have a branch with three commits:
1. `init server package` (commit abc1234 in our example)
2. `init frontend package`
3. `init app package`

A reviewer asks you to fix a typo in the server package. Instead of making a messy "fix" commit, you can use `--fixup`.

First, make your changes and stage them:
```bash
git add server-package.nix
```

Then, instead of a normal commit message, tell Git which commit you are fixing:
```bash
git commit --fixup=abc1234
```

**Pro tip**: You can also grep for the commit message like so: `$(git log --oneline | grep "init server package" | head -n 1 | awk '{print $1}')`. This can be aliased to save yourself from doing this lookup.

Git automatically creates a new commit with the message `fixup! init server package`. You can safely push this to your PR if you would like this to be reviewd before squashing it. Reviewers will see exactly what you changed, and you haven't rewritten history yet.

### Squashing It All Together

Once your are ready to merge, it's time to clean up. We want to combine (or "squash") that fixup commit into the original commit it belongs to. This is similar to the squash merge strategy you can choose in GitHub, but fixups are squashed into each commit you've edited sequentially.

Run an interactive rebase against your main branch and add the `--autosquash` flag:

```bash
git rebase -i main --autosquash
```

When your editor opens, you will see that Git has automatically moved your `fixup!` commits right beneath each original commit and marked it to be squashed. At this point, you don't even have to change anything. Just save and close the editor. Git combines the commits and throws away the "fixup!" message. Your history is clean again and you can force push to your removte branch to update the PR before merging.