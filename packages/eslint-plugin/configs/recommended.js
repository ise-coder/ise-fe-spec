module.exports = {
  plugins: ['eslint-plugin-ise'],
  rules: {
    'eslint-plugin-ise/no-http-url': 'warn',
    'eslint-plugin-ise/no-broad-semantic-versioning': 'error',
    'eslint-plugin-ise/no-secret-info': 'error',
    'eslint-plugin-ise/no-js-in-ts-project': 'warn',
  },
};
