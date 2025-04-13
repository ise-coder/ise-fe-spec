const rule = require('../../rules/no-secret-info');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

/**
 * 测试插件：不在代码中直接通过纯文本值设置 password token 和 secret 信息
 */
ruleTester.run('no-secret-info', rule, {
  valid: [
    {
      code: 'var accessKeySecret = process.env.ACCESS_KEY_SECRET;',
    },
    {
      code: 'var password = "";',
    },
    {
      code: `
        var client ={
          accessKeyToken: process.env.ACCESS_KEY_SECRET
        };
      `,
    },
  ],

  invalid: [
    {
      code: "var accessKeySecret = 'xxxxxx';",
      errors: [
        {
          message: 'Detect that the "xxxxxx" might be a secret token, Please check!',
        },
      ],
    },
    {
      code: `
        var client ={
          accessKeyToken: 'xxxxxx'
        };
      `,
      errors: [
        {
          message: 'Detect that the "xxxxxx" might be a secret token, Please check!',
        },
      ],
    },
  ],
});
