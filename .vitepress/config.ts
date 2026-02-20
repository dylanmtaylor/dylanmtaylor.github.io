import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'
import { imageOptimizationPlugin, picturePlugin } from './imageOptimizer'

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
        ['meta', { property: 'og:title', content: 'Dylan M. Taylor' }],
        ['meta', { property: 'og:description', content: 'My Personal Website and Blog' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://dylanmtaylor.com' }],
        ['meta', { property: 'og:image', content: 'https://dylanmtaylor.com/images/avatar.png' }],
        ['meta', { name: 'twitter:card', content: 'summary' }],
    ],

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
    } as any,
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
