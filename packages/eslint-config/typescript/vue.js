module.exports = {
  extends: ['./index', '../rules/vue'].map(require.resolve),
  parserOptions: {
    // @link https://github.com/mysticatea/vue-eslint-parser#parseroptionsparser
    parser: '@typescript-eslint/parser',
  },
};
