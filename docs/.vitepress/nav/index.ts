export default {
  nav: [
    {
      text: '首页',
      link: '/'
    },
    {
      text: '构建工具',
      items: [
        {
          text: 'Vite',
          link: '/build-tools/Vite/index.md'
        }
      ]
    },
    {
      text: '前端框架',
      items: [
        { text: 'Vue', link: '/frontend-framework/Vue/index.md' },
        { text: 'React', link: '/frontend-framework/React' }
      ]
    }
  ],

  sidebar: {
    '/frontend-framework/Vue/': [
      {
        text: 'Vue 源码解析',
        collapsed: false,
        items: [
          { text: '1. 响应式原理', link: '/frontend-framework/Vue/items/1.reactivity.md' }
        ]
      }
    ],
    '/frontend-framework/React/': [
      {
        text: 'React 源码解析',
        collapsed: false,
      }
    ]
      
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
  ]
}
