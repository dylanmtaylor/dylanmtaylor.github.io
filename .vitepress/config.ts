import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { getPosts } from './theme/serverUtils'

const pageSize = 10

export default withMermaid(defineConfig({
    title: "Dylan M. Taylor",
    description: "My Personal Website and Blog",

    appearance: 'force-dark',
    cacheDir: './node_modules/vitepress_cache',

    themeConfig: {
        logo: '/images/circle.png',
        posts: await getPosts(pageSize),
        comment: {
            repo: 'airene/vitepress-blog-pure',
            themes: 'github-light',
            issueTerm: 'pathname'
        },
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
            // {
            //     text: 'Category',
            //     link: '/blog/category'
            // },
            // {
            //     text: 'Archives',
            //     link: '/blog/archives'
            // },
            // {
            //     text: 'Tags',
            //     link: '/blog/tags'
            // },
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
        server: {
            port: 5000
        }
    }
    /*
        optimizeDeps: {
                keepNames: true
        }
        */
}))
