---
date: '2026-04-02'
title: Avoiding Building the Same Thing Twice with Content-Addressable Hashing
description: How to use content-addressable hashes of build inputs to tag artifacts and skip redundant CI builds when nothing has changed.
---
## Avoiding Building the Same Thing Twice with Content-Addressable Hashing

If you're building container images or OCI artifacts in CI, you've probably noticed that a lot of builds are redundant. A workflow triggers on a merge to main, but the files that actually affect the build output haven't changed. Maybe someone updated a README, fixed a typo in a comment, or modified an unrelated workflow. The build runs anyway, burns through CI minutes, pushes an identical artifact, signs it, attests it, and produces the exact same bytes that are already sitting in your registry.

This is wasteful, and for expensive builds like compiling a Linux kernel or building a large container image, it adds up fast. I recently implemented a simple technique to solve this: hash all of the build-relevant inputs, tag the resulting artifact with that hash, and check for the tag's existence before starting a build. If the tag exists, the build is skipped entirely.

### The Concept

The approach borrows from how content-addressable storage works in systems like Git or Nix. Instead of asking "has this commit been built before?" (which conflates code changes with build-relevant changes), you're really asking "has this exact combination of inputs been built before?"

The inputs that matter depend on your project, but generally include:

- Version strings or pinned dependency versions
- Build configuration files (Dockerfiles, spec files, PKGBUILDs, etc.)
- The workflow file itself (since changes to build steps can affect output)

Things that don't matter: documentation, CI configs for unrelated workflows, test files that don't affect the build artifact.

### Computing the Hash

Concatenate all relevant inputs into a single stream and pipe it through a hashing function:

```bash
HASH=$(
  {
    echo "version=${VERSION}"
    echo "variant=${VARIANT}"
    sha256sum \
      Dockerfile \
      config/build.conf \
      package.json \
      package-lock.json \
      .github/workflows/build.yaml
    find src/ -type f -exec sha256sum {} \;
  } | sha256sum | cut -d' ' -f1
)
SHORT_HASH="${HASH:0:12}"
```

The `echo` statements inject scalar values (version strings, matrix parameters) into the hash input. The `sha256sum` calls on files produce a content hash for each file. The outer `sha256sum` combines everything into a single deterministic fingerprint. Truncating to 12 characters keeps the tag readable while still being collision-resistant for practical purposes.

A few things to note about this approach:

- File ordering matters. Keep it consistent so the same inputs always produce the same hash.
- If your build matrix includes a parameter like a distro version, include it in the hash. Two builds with identical files but different matrix values should produce different hashes.
- Including the workflow file itself means that changes to build steps (like upgrading a compiler or changing build flags) will invalidate the cache. This is intentional.

### Checking the Registry and Skipping the Build

Before building, check whether an artifact with the content hash tag already exists in your registry. Most container registries and OCI-compatible tools support fetching a manifest by tag, so you can check for the existence of `sha-<hash>` with a single API call. If the tag resolves, the artifact has already been built from identical inputs and you can skip everything: the build itself, the push, signing, attestation, all of it. The pipeline short-circuits after the hash check.

After a successful build and push, tag the new artifact with `sha-<hash>` so that future runs can detect it. In CI systems like GitHub Actions, you'd wire this up with step outputs and `if` conditions so that every step after the check is gated on whether the artifact already exists.

### Why Not Just Use Docker Layer Caching?

Docker layer caching helps with incremental builds, but it doesn't help you skip the build entirely. Even with a warm cache, Docker still needs to evaluate every layer, check cache validity, and produce a final image. For a simple web app, that might take seconds. For something like a kernel build with custom configs, it can take an hour even with caching.

Content-addressable skipping is a layer above caching. It answers the question "should we even start?" before any build tooling runs. The two approaches are complementary. You can use layer caching for builds that do need to run, and content-addressable skipping to avoid running them at all when inputs haven't changed.

### Handling Matrix Builds

If your workflow uses a build matrix (building for multiple distro versions or architectures, for example), include the matrix parameters in both the hash and the tag. A build targeting Fedora 41 might use a tag like `sha-<hash>-fc41`, while the same commit targeting Arch would just be `sha-<hash>`.

This ensures that each matrix combination is tracked independently. A change to a distro-specific config file will invalidate those builds without affecting the others, and vice versa.

### Trade-offs

This approach has a few properties worth considering:

- **Extra tags are free.** Container registries don't charge for tags. They're just pointers to existing manifests, so adding a `sha-*` tag to every artifact costs nothing.
- **False negatives are safe.** If the hash check fails for any reason (network issue, registry timeout, tag got garbage collected), the build runs normally. You waste CI time but don't miss a build.
- **False positives are unlikely but possible.** If you forget to include a relevant input in the hash, you could skip a build that should have run. Be thorough about what goes into the hash, and include the workflow file itself as a catch-all for build process changes.
- **It doesn't replace versioning.** The content hash tag is an internal optimization. Your artifacts should still have proper semantic version tags for consumers. The hash tag is just a marker that says "this combination of inputs has been built."

### When This Matters Most

This technique is most valuable when builds are expensive and inputs change infrequently relative to the overall commit frequency. Kernel builds, base image builds, and multi-architecture container builds are all good candidates. If your build takes 10 seconds, the overhead of the hash check probably isn't worth it. But if it takes 30 minutes and runs on every push to main, you'll save a lot of CI time.

For the project where I implemented this, builds take roughly 45 minutes each, and the matrix produces several of them per push. Most of those builds were producing identical output because the actual inputs hadn't changed. Only unrelated files in the repository were modified. With content-addressable hashing in place, those redundant builds are skipped entirely.
