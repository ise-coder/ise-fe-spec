'use strict';

const rule = require('../../rules/no-http-url');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

/**
 * 测试插件：推荐将 HTTP 链接换为 HTTPS 链接
 */
ruleTester.run('no-http-url', rule, {
  valid: [
    {
      code: "var test = 'https://ise-coder.github.io/';",
    },
  ],
  invalid: [
    {
      code: "var test = 'http://ise-coder.github.io/';",
      output: "var test = 'http://ise-coder.github.io/';",
      errors: [
        {
          message: 'Recommended "http://ise-coder.github.io/" switch to HTTPS',
        },
      ],
    },
    {
      code: "<img src='http://ise-coder.github.io/' />",
      output: "<img src='http://ise-coder.github.io/' />",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'Recommended "http://ise-coder.github.io/" switch to HTTPS',
        },
      ],
    },
  ],
});
