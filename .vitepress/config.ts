import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import attrs from 'markdown-it-attrs'
import { imageOptimizationPlugin, picturePlugin } from './imageOptimizer.ts'
import { getPosts } from './theme/serverUtils.ts'

const pageSize = 10
const siteUrl = 'https://dylanmtaylor.com'

type ThemeConfig = DefaultTheme.Config & {
    posts: Awaited<ReturnType<typeof getPosts>>
}

function pageUrl(relativePath: string): string {
    const path = relativePath
        .replace(/(^|\/)index\.md$/, '$1')
        .replace(/\.md$/, '.html')
    return new URL(`/${path}`, siteUrl).href
}

function serializeJson(value: unknown): string {
    return JSON.stringify(value).replaceAll('<', '\\u003c')
}

export default defineConfig<ThemeConfig>({
    title: 'Dylan M. Taylor',
    description: 'My Personal Website and Blog',

    appearance: 'force-dark',
    cacheDir: './.vitepress/cache',
    lastUpdated: false,

    markdown: {
        config: (md) => {
            md.use(picturePlugin)
            md.use(attrs)
            const defaultFence = md.renderer.rules.fence!.bind(md.renderer.rules)
            md.renderer.rules.fence = (tokens, index, options, env, self) => {
                const token = tokens[index]
                if (token.info.trim() === 'mermaid') {
                    const graph = encodeURIComponent(token.content)
                    return `<Suspense><template #default><Mermaid id="mermaid-${index}" graph="${graph}"></Mermaid></template><template #fallback>Loading…</template></Suspense>`
                }
                return defaultFence(tokens, index, options, env, self)
            }
        }
    },

    sitemap: {
        hostname: siteUrl
    },

    head: [
        ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
        ['link', { rel: 'icon', href: '/images/favicon.svg', type: 'image/svg+xml' }],
        ['link', { rel: 'icon', href: '/images/favicon.png', type: 'image/png' }],
        ['meta', { name: 'theme-color', content: '#1b1b1f' }],
        ['meta', { name: 'view-transition', content: 'same-origin' }],
        ['meta', { property: 'og:site_name', content: 'Dylan M. Taylor' }],
        ['meta', { property: 'og:image', content: `${siteUrl}/images/avatar.png` }],
        ['meta', { name: 'twitter:image', content: `${siteUrl}/images/avatar.png` }],
        ['script', { type: 'speculationrules' }, serializeJson({
            prefetch: [{ where: { href_matches: '/*' }, eagerness: 'moderate' }],
            prerender: [{ where: { href_matches: '/*' }, eagerness: 'moderate' }]
        })]
    ],

    transformPageData(pageData) {
        const title = String(pageData.frontmatter.title || pageData.title || 'Dylan M. Taylor')
        const description = String(
            pageData.frontmatter.description || pageData.description || 'My Personal Website and Blog'
        )
        const isPost = pageData.relativePath.startsWith('posts/')
        const url = pageUrl(pageData.relativePath)

        pageData.frontmatter.head ??= []
        pageData.frontmatter.head.push(
            ['link', { rel: 'canonical', href: url }],
            ['meta', { property: 'og:title', content: title }],
            ['meta', { property: 'og:description', content: description }],
            ['meta', { property: 'og:type', content: isPost ? 'article' : 'website' }],
            ['meta', { property: 'og:url', content: url }],
            ['meta', { name: 'twitter:card', content: 'summary' }],
            ['meta', { name: 'twitter:title', content: title }],
            ['meta', { name: 'twitter:description', content: description }]
        )

        if (isPost && pageData.frontmatter.date) {
            const datePublished = String(pageData.frontmatter.date).slice(0, 10)
            const structuredData = {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: title,
                description,
                datePublished,
                url,
                author: {
                    '@type': 'Person',
                    name: 'Dylan M. Taylor',
                    url: siteUrl
                },
                publisher: {
                    '@type': 'Person',
                    name: 'Dylan M. Taylor'
                }
            }
            pageData.frontmatter.head.push(
                ['meta', { property: 'article:published_time', content: datePublished }],
                ['script', { type: 'application/ld+json' }, serializeJson(structuredData)]
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
        'README.md',
        'UPGRADE_REPORT.md'
    ],

    vite: {
        plugins: [imageOptimizationPlugin()],
        server: {
            port: 5000
        }
    }
})
