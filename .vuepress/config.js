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
		  ],
	    title: 'Dylan M. Taylor',
	    description: 'My personal website and blog',
	    themeConfig: {
		            logo: '/images/circle.png',
		            nav: [
				                { text: 'Home', link: '/' },
												{ text: 'About Me', link: '/about-me/'},
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
