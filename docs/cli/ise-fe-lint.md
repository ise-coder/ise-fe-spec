---
layout: doc
---

# ise-fe-lint

> ISE 前端编码规范工程化标准脚手架

`ise-fe-lint` 是[ISE 前端编码规范工程化](https://github.com/ise-coder/ise-fe-spec)的配套 Lint 工具，可以为项目一键接入规范、一键扫描和修复规范问题，保障项目的编码规范和代码质量。

## 背景

我们引入了多个业界流行的 Linter，并根据规范内容定制了规则包，它们包括：

| 规范 | Lint 工具 | npm 包 |
| ---- | ---- | ---- |
| 文档规范 | [markdownlint](https://github.com/DavidAnson/markdownlint) | [ise-fe-markdownlint-config](https://www.npmjs.com/package/ise-fe-markdownlint-config) |
| Git 规范 | [commitlint](https://commitlint.js.org/) | [commitlint-config-ise](https://www.npmjs.com/package/commitlint-config-ise) |
| CSS 规范 | [stylelint](https://stylelint.io/) | [ise-fe-stylelint-config](https://www.npmjs.com/package/ise-fe-stylelint-config) |
| JS/TS/Node 规范 | [ESLint](https://eslint.org/docs/v8.x) | [eslint-config-ise](https://www.npmjs.com/package/eslint-config-ise) |

可以看到这些 `Linter` 和规则包众多且零散，全部安装它们会给项目增加十几个依赖，接入和升级成本都比较高。

`ise-fe-lint` 收敛屏蔽了这些依赖和配置细节，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复、一键升级，降低项目实施规范的成本

## CLI 使用

> [!TIP] 安装

在终端执行：

``` bash
npm install ise-fe-lint -g
```

安装完成后，可执行 `ise-fe-lint -h` 以验证安装成功。

> [!TIP] 使用

 `ise-fe-lint init`：一键接入

在项目根目录执行 `ise-fe-lint init`，即可一键接入规范，为项目安装规范 `Lint` 所需的依赖和配置。

具体会做以下事情：

- 安装各种依赖：包括 `Linter` 依赖，如 [ESLint](https://eslint.org/)、[stylelint](https://stylelint.io/)、[commitlint](https://commitlint.js.org/#/)、[markdownlint](https://github.com/DavidAnson/markdownlint) 等；配置依赖，如 [commitlint-config-ise](https://www.npmjs.com/package/commitlint-config-ise)、[ise-fe-markdownlint-config](https://www.npmjs.com/package/ise-fe-markdownlint-config)、[ise-fe-stylelint-config](https://www.npmjs.com/package/ise-fe-stylelint-config) 、[eslint-config-ise](https://www.npmjs.com/package/eslint-config-ise)等
- 写入各种配置文件，包括：
  - `.eslintrc.js`、`.eslintignore`：ESLint 配置（继承 `eslint-config-ise`）及白名单文件
  - `.stylelintrc.js`、`.stylelintignore`：stylelint 配置（继承 `ise-fe-stylelint-config`）及白名单文件
  - `commitlint.config.js`：commitlint 配置（继承 `commitlint-config-ise`）
  - `.markdownlint.json`、`.markdownlintignore`：`markdownlint` 配置及白名单文件
  - `.prettierrc.js`：符合规范的 [Prettier 配置](https://prettier.io/docs/en/configuration.html)
  - `.editorconfig`：符合规范的 [editorconfig](https://editorconfig.org/)
  - `.vscode/extensions.json`：写入规范相关的 [VSCode 插件推荐](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions)，包括 `ESLint`、`stylelint`、`markdownlint`、`prettier` 等
  - `.vscode/settings.json`：写入规范相关的 [VSCode 设置](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations)，设置 `ESLint` 和 `stylelint` 插件的 `validate` 及**保存时自动运行 fix**，如果选择使用 `Prettier`，会同时将 `prettier-vscode` 插件设置为各前端语言的 defaultFormatter，并配置**保存时自动格式化**

> *注 1*：如果项目已经配置过 ESLint、stylelint 等 Linter，执行 `ise-fe-lint init` 将会提示存在冲突的依赖和配置，并在得到确认后进行覆盖。
>
> *注 2*：如果项目的 .vscode/ 目录被 .gitignore 忽略，可以在拉取项目后单独执行 `ise-fe-lint init --vscode` 命令写入 `.vscode/extensions.json` 和 `.vscode/settings.json` 配置文件。

`ise-fe-lint scan`：一键扫描

在项目的根目录执行命令，即可扫描项目的规范问题：

支持下列参数：

- `-q` `--quiet` 仅报告 error 级别的问题
- `-o` `--output-report` 输出扫描出的规范问题日志
- `-i` `--include <dirpath>` 指定要进行规范扫描的目录
- `--no-ignore` 忽略 eslint 的 ignore 配置文件和 ignore 规则

>*注 1*：事实上，你可以在任意目录执行 `ise-fe-lint scan` `ise-fe-lint` 会根据文件类型、JSON 等特征嗅探项目类型。但我们还是推荐在执行过 `ise-fe-lint init` 的项目根目录执行 `ise-fe-lint scan`，以得到最准确的扫描结果。
>
> *注 2*: `ise-fe-lint` 会根据项目内有无 eslint 和 stylelint 配置文件判断使用项目的配置文件还是 `ise-fe-lint` 默认配置进行扫描。若使用项目的配置文件时，在未安装依赖时会帮其安装（执行 `npm i`）。若使用项目配置扫描失败，则使用默认配置扫描。

`ise-fe-lint fix`：一键修复

在项目的根目录执行命令，即可修复部分规范问题：

支持下列参数：

- `-i` `--include <dirpath>` 指定要进行修复扫描的目录
- `--no-ignore` 忽略 eslint 的 ignore 配置文件和 ignore 规则

注意请 review 下修复前后的代码，以免工具误修的情况。

`ise-fe-lint update`：一键升级

打开命令终端执行命令，即可检测脚手架的最新版本，实现脚手架的一键升级。

需要注意，如果使用的是 `pnpm` ，主要先执行 `pnpm setup` 它会自动检测系统环境，并为你创建和配置全局二进制文件目录，同时将其添加到系统的PATH环境变量中。如果使用的是 `zsh` 该命令还会将环境配置写入`.zshrc`配置文件，需要手动执行一下 `source .zshrc` 使得配置生效。

## Node.js API 使用

> [!TIP] 安装

```bash
npm install ise-fe-lint --save
```

> [!IMPORTANT] API

1. init：初始化

- ise-fe-lint.init(config)：将项目一键接入规范，效果等同于CLI中的 `ise-fe-lint init`

示例：

``` js
await ise-fe-lint.init({
    eslintType: 'javascript/vue',
    enableESLint: true,
    enableStylelint: true,
    enableMarkdownlint: true,
    enablePrettier: true,
    disableNpmInstall: false,
  })
```

config 参数如下：

| 参数               | 类型       | 默认值 | 说明                                                                                                                |
| ------------------ | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| cwd                | string     | -      | 项目绝对路径                                                                                                        |
| eslintType         | ESLintType | -      | 语言和框架类型，如果不配置，等同于 ise-fe-lint init，控制台会出现选择器，如果配置，控制台就不会出现选择器        |
| enableESLint       | boolean    | true   | 是否启用 ESLint，如果不配置默认值为 true，即默认启用 ESLint                                                         |
| enableStylelint    | boolean    | -      | 是否启用 stylelint，如果不配置，等同于 ise-fe-lint init，控制台会出现选择器，如果配置，控制台就不会出现选择器    |
| enableMarkdownlint | boolean    | -      | 是否启用 markdownlint，如果不配置，等同于 ise-fe-lint init，控制台会出现选择器，如果配置，控制台就不会出现选择器 |
| enablePrettier     | boolean    | -      | 是否启用 Prettier                                                                                                   |
| disableNpmInstall  | boolean    | false  | 是否禁用自动在初始化完成后安装依赖                                                                                  |

ESLintType 取值如下：

- `index`: 纯 JS 项目
- `vue`: JS + Vue 项目
- `react`: JS + React 项目
- `node`: JS + Node.js 项目
- `typescript`: 纯 TS 项目
- `typescript/vue`: TS + Vue 项目
- `typescript/react`: TS + React 项目
- `typescript/node`: TS + Node.js 项目

配置如下：

`ise-fe-lint` 基于一份配置进行扫描（但你也可以零配置使用），支持的配置参数有：

| 参数                | 类型                    | 默认值 | 说明                                                                                           |
| ------------------- | ----------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| enableESLint        | boolean                 | true   | 是否启用 ESLint                                                                                |
| enableStylelint     | boolean                 | true   | 是否启用 stylelint                                                                             |
| enableMarkdownlint  | boolean                 | true   | 是否启用 markdownlint                                                                          |
| enablePrettier      | boolean                 | -      | 是否启用 Prettier                                                                              |
| markdownlintOptions | markdownlint.Options    | -      | markdownlint 配置项，若未设置将使用执行目录下或内置的默认 markdownlint 配置文件进行扫描        |
| stylelintOptions    | stylelint.LinterOptions | -      | stylelint 配置项，若未设置将使用执行目录下或内置的默认 stylelintrc 和 stylelintignore 进行扫描 |
| eslintOptions       | ESLint.Options          | -      | ESLint 配置项，若未设置将使用执行目录下或内置的默认 eslintrc 和 eslintignore 进行扫描          |

`ise-fe-lint` 会读取执行目录下的 `ise-fe-lint.config.js` 作为配置文件。`ise-fe-lint init` 会在执行目录下新增如下的 `ise-fe-lint.config.js` 文件：

```js
module.exports = {
  enableESLint: true,
  enableStylelint: true,
  enableMarkdownlint: true,
  enablePrettier: true,
};
```

## 常见问题

### 项目扫描及修复速度慢问题

注意在使用 `ise-fe-lint scan` 及 `ise-fe-lint fix` 时一定要指定扫描及修复的目录范围，否则运行时间会很长。

- 未指定修复目录范围

![ise-fe-lint fix](/img/20250416-105243.gif)

- 指定修复目录范围

![ise-fe-lint fix](/img/20250416-105454.gif)

### TypeScript 项目扫描性能问题

如果你的 TS 项目 commit 卡口和 `ise-fe-lint scan` 运行时间很长，可以通过如下在 `.eslintrc.js` 中增加以下配置提升性能：

```js
module.exports = {
  parserOptions: {
    project: [], // for lint performance
    createDefaultProgram: false, // for lint performance
  },
  rules: {
    '@typescript-eslint/dot-notation': 0, // for lint performance
    '@typescript-eslint/restrict-plus-operands': 0, // for lint performance
  },
};
```
