# ise-fe-markdownlint-config

> ISE 文档规范

支持配套的 [markdownlint 可共享配置](https://www.npmjs.com/package/markdownlint#optionsconfig)。

## 安装

需要先行安装 [markdownlint](https://www.npmjs.com/package/markdownlint)：

```bash
npm install ise-fe-markdownlint-config markdownlint markdownlint-cli --save-dev
```

## 使用

在 `.markdownlint.json` 中继承本包:

```json
{
  "extends": "ise-fe-markdownlint-config"
}
```
