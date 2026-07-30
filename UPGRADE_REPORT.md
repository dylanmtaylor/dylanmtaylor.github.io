# Repository Modernization Report

Date: 2026-07-30

## Executive summary

The site has been modernized to the current Node 24 LTS toolchain, current direct dependencies, current GitHub Actions, stricter validation, and safer deployment configuration. The production build, local preview, generated links, metadata, image variants, dependency tree, and security audit all pass.

The principal version exception is intentional: VitePress remains pinned to the latest 2.0 prerelease because the latest stable release, 1.6.4, resolves to Vite 5 and esbuild versions with three current audit findings (two moderate and one high) and no compatible fix. VitePress 2.0.0-alpha.18 resolves to an audit-clean graph.

## Version and dependency changes

- Pinned Node.js 24.18.1 LTS in `.nvmrc` and both deployment pipelines.
- Declared npm 11.16.0 as the project package manager, matching the npm release bundled with Node 24.18.1. Validation used the locally installed npm 11.17.0.
- Updated `markdown-it-attrs` from 5.0.0 to 5.0.1.
- Aligned `@types/node` with the Node 24 runtime at 24.13.3 instead of using Node 26 declarations.
- Added `@types/fs-extra` 11.0.4 for strict source validation.
- Retained current stable releases of Vue compiler 3.5.40, fs-extra 11.4.0, globby 16.2.2, gray-matter 4.0.3, Mermaid 11.16.0, Sharp 0.35.3, and TypeScript 7.0.2.
- Pinned VitePress exactly to 2.0.0-alpha.18 so prerelease updates are reviewed rather than accepted implicitly.
- Regenerated `package-lock.json` with a clean resolved dependency graph.

`npm outdated` now reports only two deliberate channel choices: Node 24 type declarations instead of Node 26 declarations, and secure VitePress 2 alpha instead of vulnerable VitePress 1.6.4 stable.

## CI/CD and maintenance

- Corrected GitLab Pages deployment to publish `.vitepress/dist` directly with the supported `pages.publish` syntax. The former `mv .vitepress/dist public` command targeted an existing source directory and could produce an incorrect nested artifact.
- Replaced the ineffective cached `node_modules` directory with npm download and image-optimization caches keyed by `package-lock.json`.
- Upgraded GitHub Actions to checkout 7.0.1, setup-node 7.0.0, upload-pages-artifact 5.0.0, and deploy-pages 5.0.0.
- Pinned every GitHub Action to its immutable commit SHA, with release comments for maintainability.
- Applied least-privilege job permissions, timeouts, manual dispatch support, and cancellation of superseded deployments.
- Both CI systems now run the complete `npm run check` gate before deployment.
- Added weekly Dependabot checks for npm packages and GitHub Actions.

## Source and configuration improvements

- Added strict TypeScript 7 configuration and a native `tsc --noEmit` validation command.
- Added explicit ESM source extensions needed by Vite's future native configuration loader.
- Added typed custom VitePress theme data and local Vue/CSS module declarations.
- Validated required post title/date frontmatter and made post ordering deterministic.
- Made pagination generation remove stale pages before writing the current set.
- Hardened `make_post.sh` with strict shell mode, input validation, YAML-safe titles, predictable slugs, and overwrite protection.
- Added canonical URLs, article publication metadata, Twitter image metadata, and safely serialized JSON-LD.
- Added stable Vue loop keys, typed component props, pagination semantics, and an accessible current-page marker.
- Replaced Mermaid's global DOM observer with VitePress theme-state watching, explicit strict security mode, error handling, stale-render protection, and lazy module loading.
- Updated image optimization to use SHA-256, invalidate caches when encoding options change, cap concurrency, run once across client/server builds, preserve Markdown image attributes, and fail the build rather than publish references to missing AVIF/WebP files.
- Strengthened the deployable content security policy, clickjacking protection, and permissions policy.
- Replaced outdated hosting documentation with current setup, validation, deployment, and licensing guidance.

## Validation results

The following checks passed:

- Clean `npm ci` installation.
- `npm run typecheck` with TypeScript 7.0.2.
- `npm run check`, including a complete VitePress production build and Vue SFC compilation.
- `npm audit`: 0 known vulnerabilities across 282 installed packages.
- `npm ls --depth=0`: all direct dependencies resolved correctly.
- Production preview HTTP smoke tests for the home page, blog index, and a post.
- Generated artifact check across 81 HTML pages, all root-relative link targets, and canonical metadata; the generated 404 page is intentionally non-canonical.
- Image artifact check across 21 original images and all 42 expected AVIF/WebP variants.
- Post-generator functional smoke test and `bash -n` syntax validation.
- `git diff --check` patch integrity validation.

The cached production build completes in approximately three seconds. Local validation ran on Node 26.5.0 because Node 24.18.1 was not installed on the workstation; both CI pipelines are configured to exercise the exact pinned Node 24.18.1 runtime.

## Residual risks and recommendations

1. **VitePress prerelease dependency (medium):** VitePress 2 is still alpha. This is currently preferable to the vulnerable stable dependency graph, but regressions remain possible. Keep the exact pin and move to VitePress 2 stable as soon as it is released and passes the same validation suite.
2. **Vue semantic checker gap (low):** The current `vue-tsc` release depends on a TypeScript entrypoint removed in TypeScript 7 and crashes before checking. Native TypeScript checking plus the production SFC build is enabled instead. Reintroduce `vue-tsc` when it declares and demonstrates TypeScript 7 compatibility.
3. **Mermaid bundle size (low):** Vite reports one 662 KB minified Mermaid chunk. Mermaid is now lazy-loaded, so pages without diagrams do not fetch it. Reassess if diagram traffic or mobile performance makes this material.
4. **Host-level headers (medium):** `_headers` is not interpreted by every static host, including typical GitHub Pages and GitLab Pages configurations. Configure equivalent headers at the authoritative CDN or reverse proxy and verify them against the production domain.
5. **Inline CSP allowances (low):** VitePress requires inline scripts/styles in the static output, so the policy still permits `'unsafe-inline'`. Removing this would require a host capable of per-response nonces or generated CSP hashes.
6. **Runtime parity (low):** The exact Node 24 build was not available locally. The first GitHub and GitLab pipeline runs should be reviewed to confirm CI parity before treating the deployment migration as fully proven.
7. **Browser-level regression coverage (low):** The repository has build and artifact checks but no visual, accessibility, or end-to-end browser suite. A lightweight Playwright smoke test would be the next useful quality investment if the theme changes frequently.
