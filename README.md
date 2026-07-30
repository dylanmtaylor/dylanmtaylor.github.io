# Dylan M. Taylor's Personal Homepage

[![GitLab pipeline status](https://gitlab.com/dylanmtaylor/dylanmtaylor.gitlab.io/badges/master/pipeline.svg)](https://gitlab.com/dylanmtaylor/dylanmtaylor.gitlab.io/-/pipelines)
[![Deploy to GitHub Pages](https://github.com/dylanmtaylor/dylanmtaylor.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/dylanmtaylor/dylanmtaylor.github.io/actions/workflows/deploy.yml)

The source for [dylanmtaylor.com](https://dylanmtaylor.com), built as a static site with VitePress, Vue, Mermaid, and Sharp. The custom Vite plugin generates AVIF and WebP variants for images, and the theme builds the blog index and archive from Markdown frontmatter.

## Requirements

- Node.js 24.18.1 LTS (see `.nvmrc`)
- npm 11.16.0 or newer

## Development

```sh
npm ci
npm run dev
```

Useful commands:

- `npm run typecheck` validates the TypeScript configuration and theme code.
- `npm run build` compiles Vue components and creates the production site in `.vitepress/dist`.
- `npm run check` runs type checking and a complete production build.
- `npm run preview` serves the production build locally.
- `./make_post.sh "Post title"` creates a dated post draft.

Generated build output, image caches, and pagination pages are intentionally ignored. Always use `npm ci` for a lockfile-reproducible installation.

## Deployment

Pushes to `master` are validated and deployed by both GitLab Pages and GitHub Pages. GitLab publishes `.vitepress/dist` directly; GitHub uploads the same directory as a Pages artifact. Dependency and action updates are monitored by Dependabot.

The `public/_headers` file provides a recommended security policy for hosting platforms that support `_headers`. Equivalent headers must be configured separately on hosts that do not process this file.

## License

Source code is available under the [MIT License](LICENSE). Site content is licensed under CC BY-SA 4.0 unless otherwise noted.
