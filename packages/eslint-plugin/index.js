const path = require('path');
const requireAll = require('require-all');

// 规则 @link: https://eslint.org/docs/v8.x/extend/plugins#rules-in-plugins
exports.rules = requireAll({
  dirname: path.resolve(__dirname, 'rules'),
});

// 配置 @link: https://eslint.org/docs/v8.x/extend/plugins#configs-in-plugins
exports.configs = requireAll({
  dirname: path.resolve(__dirname, 'configs'),
});

// 处理器 @link: https://eslint.org/docs/v8.x/extend/plugins#processors-in-plugins
exports.processors = {
  '.json': {
    preprocess(text) {
      // 将 json 文件内容转换为 js 文件格式
      return [`module.exports = ${text}`];
    },
  },
};
