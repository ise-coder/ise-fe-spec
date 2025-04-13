const RULE_NAME = 'no-http-url';

/**
 * 插件：推荐将 HTTP 链接换为 HTTPS 链接
 * link: https://eslint.org/docs/v8.x/extend/plugins
 */
module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    fixable: null,
    messages: {
      noHttpUrl: 'Recommended "{{url}}" switch to HTTPS',
    },
  },
  create(context) {
    return {
      Literal: function handleRequires(node) {
        if (node.value && typeof node.value === 'string' && node.value.indexOf('http:') === 0) {
          context.report({
            node,
            messageId: 'noHttpUrl', // 与 meta 中的 message 中的 noHttpUrl 对应
            data: {
              // 与 meta 中的 message 中的 noHttpUrl 中的 url 对应
              url: node.value,
            },
          });
        }
      },
    };
  },
};
