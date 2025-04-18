/**
 * 将部分 error 级别的 typescript eslint 规则降级为 warn
 */

module.exports = {
  rules: {
    // 使用 2 个空格缩进
    // @unessential
    '@typescript-eslint/indent': 'off',

    // 使用分号
    // @unessential
    '@typescript-eslint/semi': 'off',

    '@typescript-eslint/adjacent-overload-signatures': 'warn',

    '@typescript-eslint/no-parameter-properties': 'warn',
  },
};
