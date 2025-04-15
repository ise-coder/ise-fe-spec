const rule = require('../../rules/no-broad-semantic-versioning');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

/**
 * 测试插件：不要在 package.json 中使用太过宽泛的版本指定方式，包括 *、x 和 > x
 */
ruleTester.run('no-broad-semantic-versioning', rule, {
  valid: [
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'eslint-eslint-ise': '^1.0.0' },
      })}`,
    },
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'eslint-eslint-ise': '~1.0.0' },
      })}`,
    },
  ],
  invalid: [
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'eslint-eslint-ise': '*' },
      })}`,
      errors: [
        {
          message: 'The "eslint-eslint-ise" is not recommended to use "*"',
        },
      ],
    },
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'eslint-eslint-ise': '1.x' },
      })}`,
      errors: [
        {
          message: 'The "eslint-eslint-ise" is not recommended to use "1.x"',
        },
      ],
    },
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'eslint-eslint-ise': '> 1.0.0' },
      })}`,
      errors: [
        {
          message: 'The "eslint-eslint-ise" is not recommended to use "> 1.0.0"',
        },
      ],
    },
  ],
});
