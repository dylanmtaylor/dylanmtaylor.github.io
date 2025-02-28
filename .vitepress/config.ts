import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

const pageSize = 10

export default defineConfig({
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
                link: '/blog/archives'
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
            copyright: 'Developed by Dylan Taylor'
        },
  
        socialLinks: [
            { 
                icon: 'git', 
                link: 'https://git.dylanmtaylor.com/' 
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
})
