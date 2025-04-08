import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ISE 前端编码规范工程化",
  description: "ISE 前端编码规范工程化",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/img/ise-logo.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "编码规范", link: "/coding/html" },
      { text: "工程规范", link: "/engineering/git" },
    ],
    sidebar: {
      "/coding/html": [
        {
          text: "编码规范",
          items: [{ text: "HTML编码规范", link: "/coding/html" }],
        },
      ],
      "/engineering/git": [
        {
          text: "工程规范",
          items: [{ text: "GIT规范", link: "/engineering/git" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/ise-coder/ise-spec  " },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present MJ",
    },
  },
});
