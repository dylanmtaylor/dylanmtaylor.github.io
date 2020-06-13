module.exports = {
			plugins: [
		    [
		      '@vuepress/blog',
		      {
		        directories: [
		          {
		            // Unique ID of current classification
		            id: 'post',
		            // Target directory
		            dirname: '_posts',
		            // Path of the `entry page` (or `list page`)
		            path: '/blog/',
		          },
		        ],
		      },
		    ],
            [
              'social-share',
              {
                networks: ['facebook', 'twitter', 'reddit', 'telegram', 'email'],
                autoQuote: true,
                isPlain: false
              },
            ],
        ],
	    title: 'Dylan M. Taylor',
	    description: 'My Personal Website and Blog',
	    themeConfig: {
		            logo: '/images/circle.png',
		            nav: [
				                { text: 'Home', link: '/' },
												{ text: 'About', link: '/about-me/'},
				                { text: 'Blog', link: '/blog/'},
												{ text: 'Donate', link: '/donate/'},
												{ text: 'Repositories', link: 'https://git.dylanmtaylor.com/'},
												{ text: 'LinkedIn', link: 'https://www.linkedin.com/in/dylanmtaylor'},
				                { text: 'Résumé', link: 'https://files.dylanmtaylor.com/dylan-resume.pdf' },
												{ text: 'Contact', link: 'mailto:dylan@dylanmtaylor.com'}
				              ]
		        },
	    serviceWorker: true
	  }
