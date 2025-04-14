import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ISE 前端编码规范工程化',
  description: 'ISE 前端编码规范工程化',
  base: '/ise-fe-spec/',
  head: [['link', { rel: 'icon', href: '/ise-fe-spec/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/img/ise-logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '编码规范', link: '/coding/html' },
      { text: '工程规范', link: '/engineering/git' },
      { text: 'NPM包', link: '/npm/markdownlint' },
      { text: '脚手架', link: '/cli/ise-fe-lint' },
    ],
    sidebar: {
      '/coding/': [
        {
          text: '编码规范',
          items: [
            { text: 'HTML 编码规范', link: '/coding/html' },
            { text: 'CSS 编码规范', link: '/coding/css' },
            { text: 'JavaScript 编码规范', link: '/coding/javascript' },
            { text: 'TypeScript 编码规范', link: '/coding/typescript' },
            { text: 'Node.js 编码规范', link: '/coding/node' },
          ],
        },
      ],
      '/engineering/': [
        {
          text: '工程规范',
          items: [
            { text: 'GIT 规范', link: '/engineering/git' },
            { text: '文档规范', link: '/engineering/doc' },
            { text: 'CHANGELOG 规范', link: '/engineering/changelog' },
          ],
        },
      ],
      '/npm/': [
        {
          text: 'NPM包',
          items: [
            { text: 'ise-fe-markdownlint-config', link: '/npm/markdownlint' },
            { text: 'ise-fe-commitlint-config', link: '/npm/commitlint' },
            { text: 'ise-fe-stylelint-config', link: '/npm/stylelint' },
            { text: 'ise-fe-eslint-config', link: '/npm/eslint' },
            { text: 'ise-fe-eslint-plugin', link: '/npm/eslint-plugin' },
          ],
        },
      ],
      '/cli/': [
        {
          text: '脚手架',
          items: [{ text: 'ise-fe-lint', link: '/cli/ise-fe-lint' }],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/ise-coder/ise-fe-spec  ' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present MJ',
    },
  },
});
