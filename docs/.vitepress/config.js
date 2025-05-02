export default {
  title: "TipJar",
  description: "Tip calculation application for partners",
  base: '/vite-tipjar/',
  outDir: 'docs/.vitepress/dist',
  themeConfig: {
    // Removing navigation and sidebar for a single page app
    nav: [],
    sidebar: false,
    search: {
      provider: 'local'
    },
    // Remove footer
    footer: {
      message: '',
      copyright: ''
    }
  },
  head: [
    ['link', { rel: 'icon', href: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png', type: 'image/png' }],
    ['link', { rel: 'shortcut icon', href: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png', type: 'image/png' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lander:wght@400;700&display=swap' }]
  ]
} 