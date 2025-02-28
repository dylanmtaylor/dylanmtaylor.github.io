import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dylan M. Taylor",
  description: "My Personal Website and Blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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

    logo: '/images/circle.png',

    search: {
      provider: 'local'
    },

    outline: false,
    sidebar: false,
    serviceWorker: true,

    footer: {
      message: 'Developed by Dylan Taylor • This site is 100% open source. • CC BY-SA 4.0 License'
    },


    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: []
    //   }
    // ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/dylanmtaylor' },
      { icon: 'git', link: 'https://git.dylanmtaylor.com/' },
      {
        icon: 'maildotru',
        link: 'mailto:dylan@dylanmtaylor.com'
      }
    ]
  }
})
