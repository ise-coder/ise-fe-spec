const rule = require('../../rules/no-js-in-ts-project');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

/**
 * 测试插件：不推荐在项目中同时存在 JS 和 TS 文件
 */
ruleTester.run('no-js-in-ts-project', rule, {
  valid: [
    {
      filename: 'index.ts',
      code: '',
    },
    {
      filename: '.stylelintrc.js',
      code: '',
    },
    {
      filename: 'home.ts',
      code: '',
    },
  ],

  invalid: [
    {
      filename: 'home.js',
      code: '',
      errors: [
        {
          message: 'The "home.js" is not recommended in TS project',
        },
      ],
    },
  ],
});
