# eslint-plugin-ise

> ISE 自定义 eslint 插件

## 安装

除了本包，你需要同时安装 [ESlint](https://eslint.org/)

``` bash
npm install eslint-plugin-ise eslint --save-dev
```

## 使用

### 引入插件

```js
// .eslintrc.js
module.exports = {
  plugin: ['ise-eslint-config'],
  rules: {
    'eslint-plugin-ise/no-http-url': 'warn',
    'eslint-plugin-ise/no-secret-info': 'error',
  },
};
```

### 使用 presets

```js
// .eslintrc.js
module.exports = {
  extends: 'plugin:eslint-plugin-ise/recommended',
};
```

## 支持的规则

- [`no-http-url`](https://ise-coder.github.io/ise-fe-spec/npm/eslint-plugin.html#no-http-url) 使用 HTTPS 协议头的 URL，而不是 HTTP
- [`no-broad-semantic-versioning`](https://ise-coder.github.io/ise-fe-spec/npm/eslint-plugin.html#no-broad-semantic-versioning) 不要指定宽泛的版本范围
- [`no-secret-info`](https://ise-coder.github.io/ise-fe-spec/npm/eslint-plugin.html#no-secret-info) 不要在代码中直接设置 `password` `token` and `secret` 信息
- [`no-js-in-ts-project`](https://ise-coder.github.io/ise-fe-spec/npm/eslint-plugin.html#no-js-in-ts-project) 不要在 TS 项目中使用 JS
