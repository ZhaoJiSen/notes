// TODO 分割
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
    ],
    '/build-tools/vite/': [
      {
        text: 'Vite',
        collapsed: false,
        items: [
          {
            text: '概述',
            link: '/build-tools/vite/index.md'
          },
          {
            text: '环境变量',
          },
          {
            text: 'CSS 处理'
          },
          {
            text: '插件'
          },
          {
            text: '性能优化',
            link: '/build-tools/vite/items/performance-optimization.md'
          } 
        ]
      }
    ]
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
  ]
}
