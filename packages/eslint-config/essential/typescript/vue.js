module.exports = {
  extends: [
    './index',
    // vue 要置于最后，因为里面使用到了 vue-parser
    '../../rules/vue',
  ].map(require.resolve),
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
