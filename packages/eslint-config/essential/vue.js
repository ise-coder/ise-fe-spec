module.exports = {
  extends: [
    '../vue',
    './rules/set-style-to-warn',
    './rules/whitelist',
    './rules/es6-whitelist',
  ].map(require.resolve),
};
