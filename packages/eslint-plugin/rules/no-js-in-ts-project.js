const path = require('path');

const RULE_NAME = 'no-js-in-ts-project';

const JS_REG = /\.jsx?$/;

const DEFAULT_WHITE_LIST = [
  'commitlint.config.js',
  'eslintrc.js',
  'prettierrc.js',
  'stylelintrc.js',
];

/**
 * 插件：不推荐在项目中同时存在 JS 和 TS 文件
 * link: https://eslint.org/docs/v8.x/extend/plugins
 */
module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    fixable: null,
    messages: {
      noJSInTSProject: 'The "{{fileName}}" is not recommended in TS project',
    },
  },

  create(context) {
    const fileName = context.getFilename();
    const extName = path.extname(fileName);
    const ruleOptions = context.options[0] || {};
    let { whiteList = [], autoMerge = true } = ruleOptions;

    if (whiteList.length === 0) {
      whiteList = DEFAULT_WHITE_LIST;
    } else if (autoMerge) {
      whiteList = [...new Set([...DEFAULT_WHITE_LIST, ...whiteList])];
    }

    const whiteListReg = new RegExp(`(${whiteList.join('|')})$`);

    if (!whiteListReg.test(fileName) && JS_REG.test(extName)) {
      context.report({
        loc: {
          start: {
            line: 0,
            column: 0,
          },
          end: {
            line: 0,
            column: 0,
          },
        },
        messageId: 'noJSInTSProject',
        data: {
          fileName,
        },
      });
    }

    // Necessary
    return {};
  },
};
