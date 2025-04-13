module.exports = {
  plugins: ['ise-fe-eslint-plugin'],
  rules: {
    'ise-fe-eslint-plugin/no-http-url': 'warn',
    'ise-fe-eslint-plugin/no-broad-semantic-versioning': 'error',
    'ise-fe-eslint-plugin/no-secret-info': 'error',
    'ise-fe-eslint-plugin/no-js-in-ts-project': 'warn',
  },
};
