module.exports = {
  extends: [
    './rules/base/best-practices',
    './rules/base/possible-errors',
    './rules/base/style',
    './rules/base/variables',
    './rules/base/es6',
    './rules/base/strict',
    './rules/imports',
  ].map(require.resolve),
  parser: '@babel/eslint-parser',
  // @link https://github.com/eslint/eslint/blob/v8.7.0/docs/user-guide/configuring/language-options.md#specifying-parser-options
  parserOptions: {
    // 不强制使用配置文件来进行解析器配置
    requireConfigFile: false,
    ecmaVersion: 'latest',
    // 代码源类型设置为模块
    sourceType: 'module',
    ecmaFeatures: {
      // 不允许在全局作用域下使用 return 语句
      globalReturn: false,
      // 启用隐式严格模式
      impliedStrict: true,
      // 允许解析 JSX 语法
      jsx: true,
    },
  },
  // 用于指示 ESLint 在当前目录及其父目录中查找配置文件
  root: true,
};
