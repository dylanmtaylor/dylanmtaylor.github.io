import { defineConfig, DefaultTheme } from 'vitepress'
import { getPosts } from './theme/serverUtils'
import { imageOptimizationPlugin, picturePlugin } from './imageOptimizer'
import attrs from 'markdown-it-attrs'

const pageSize = 10

export default defineConfig({
    title: "Dylan M. Taylor",
    description: "My Personal Website and Blog",

    appearance: 'force-dark',
    cacheDir: './.vitepress/cache',
    lastUpdated: false,

    markdown: {
        config: (md) => {
            md.use(picturePlugin)
            md.use(attrs)
            const defaultFence = md.renderer.rules.fence!.bind(md.renderer.rules)
            md.renderer.rules.fence = (tokens, idx, options, env, self) => {
                const token = tokens[idx]
                if (token.info.trim() === 'mermaid') {
                    return `<Suspense><template #default><Mermaid id="mermaid-${idx}" graph="${encodeURIComponent(token.content)}"></Mermaid></template><template #fallback>Loading...</template></Suspense>`
                }
                return defaultFence(tokens, idx, options, env, self)
            }
        }
    },

    sitemap: {
        hostname: 'https://dylanmtaylor.com'
    },

    head: [
        ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
        ['link', { rel: 'icon', href: '/images/favicon.svg', type: 'image/svg+xml' }],
        ['link', { rel: 'icon', href: '/images/favicon.png', type: 'image/png' }],
        ['meta', { name: 'theme-color', content: '#1b1b1f' }],
        ['meta', { name: 'view-transition', content: 'same-origin' }],
        ['meta', { property: 'og:site_name', content: 'Dylan M. Taylor' }],
        ['meta', { property: 'og:image', content: 'https://dylanmtaylor.com/images/avatar.png' }],
        ['script', { type: 'speculationrules' }, JSON.stringify({ prefetch: [{ where: { href_matches: '/*' }, eagerness: 'immediate' }], prerender: [{ where: { href_matches: '/*' }, eagerness: 'eager' }] })],
    ],

    transformPageData(pageData) {
        const title = pageData.frontmatter.title || pageData.title || 'Dylan M. Taylor'
        const description = pageData.frontmatter.description || pageData.description || 'My Personal Website and Blog'
        const isPost = pageData.relativePath.startsWith('posts/')
        const url = `https://dylanmtaylor.com/${pageData.relativePath.replace(/\.md$/, '.html')}`

        pageData.frontmatter.head ??= []
        pageData.frontmatter.head.push(
            ['meta', { property: 'og:title', content: title }],
            ['meta', { property: 'og:description', content: description }],
            ['meta', { property: 'og:type', content: isPost ? 'article' : 'website' }],
            ['meta', { property: 'og:url', content: url }],
            ['meta', { name: 'twitter:card', content: 'summary' }],
            ['meta', { name: 'twitter:title', content: title }],
            ['meta', { name: 'twitter:description', content: description }],
        )

        if (isPost && pageData.frontmatter.date) {
            const ld = {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: title,
                description,
                datePublished: pageData.frontmatter.date,
                url,
                author: { '@type': 'Person', name: 'Dylan M. Taylor', url: 'https://dylanmtaylor.com' },
                publisher: { '@type': 'Person', name: 'Dylan M. Taylor' }
            }
            pageData.frontmatter.head.push(
                ['script', { type: 'application/ld+json' }, JSON.stringify(ld)]
            )
        }
    },

    themeConfig: {
        logo: '/images/circle.png',
        posts: await getPosts(pageSize),
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'About',
                link: '/about-me/'
            },
            {
                text: 'Blog',
                link: '/blog/'
            },
            {
                text: 'Résumé',
                link: 'https://files.dylanmtaylor.com/dylan-resume.pdf'
            },
        ],
        
        search: {
            provider: 'local',
        },
      
        outline: false,
        aside: false,
      
        footer: {
            message: 'This site is 100% open source. • CC BY-SA 4.0 License',
        },
  
        socialLinks: [
            { 
                icon: 'github', 
                link: 'https://github.com/dylanmtaylor/' 
            },
            { 
                icon: 'gitlab', 
                link: 'https://gitlab.com/dylanmtaylor/' 
            },
            { 
                icon: 'linkedin', 
                link: 'https://www.linkedin.com/in/dylanmtaylor' 
            },
            {
                icon: 'maildotru',
                link: 'mailto:dylan@dylanmtaylor.com'
            }
        ]
    } satisfies DefaultTheme.Config & { posts: Awaited<ReturnType<typeof getPosts>> },
    srcExclude: [
        'README.md'
    ],

    vite: {
        plugins: [imageOptimizationPlugin()],
        server: {
            port: 5000
        }
    }
})
