module.exports = {
  extends: ['../react', '../../rules/typescript', '../rules/ts-whitelist'].map(require.resolve),
};
