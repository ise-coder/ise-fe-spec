# `ise-fe-commitlint-config`

> ISE Git 规范

支持配套的 [commitlint 配置](https://commitlint.js.org/#/concepts-shareable-config)，用于对 `git commit message` 进行校验。

## 安装

使用时，需要安装 [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)：

```bash
npm install ise-fe-commitlint-config @commitlint/cli --save-dev
```

## 使用

在 `commitlint.config.js` 中集成本包:

```javascript
module.exports = {
  extends: ['ise-fe-commitlint-config'],
};
```

## 设置 git hook

可通过 [husky](https://www.npmjs.com/package/husky) 设置在 `git commit` 时触发 `commitlint`。

首先安装 husky：

```bash
npm install husky --save-dev
```

初始化 husky

``` bash
npx husky init
```

在 commit-msg 中增加下面的内容

``` bash
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

> 注意：当前使用的`husky`版本为 V9 版本

更多信息可参考 [commitlint 文档](https://commitlint.js.org/guides/local-setup.html#using-a-git-hooks-manager)。
