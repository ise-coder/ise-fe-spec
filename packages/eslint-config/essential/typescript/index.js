module.exports = {
  extends: ['../index', '../../rules/typescript', '../rules/ts-whitelist'].map(require.resolve),
};
