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
      {
        text: 'Contact',
        link: 'mailto:dylan@dylanmtaylor.com'
      }
    ],

    logo: '/images/circle.png',

    search: {
      provider: 'local'
    },

    outline: false,
    sidebar: false,

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: []
    //   }
    // ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/dylanmtaylor' },
      { icon: 'git', link: 'https://git.dylanmtaylor.com/' }
    ]
  }
})
