import glob from 'glob';
import { PKG } from '../../types';

/**
 * 获取 ESLint 配置类型
 * @param cwd
 * @param pkg
 * @returns ise-fe-eslint-config/index
 * @returns ise-fe-eslint-config/react
 * @returns ise-fe-eslint-config/typescript/index
 * @returns ise-fe-eslint-config/typescript/react
 */
export function getESLintConfigType(cwd: string, pkg: PKG): string {
  const tsFiles = glob.sync('./!(node_modules)/**/*.@(ts|tsx)', { cwd });
  const reactFiles = glob.sync('./!(node_modules)/**/*.@(jsx|tsx)', { cwd });
  const vueFiles = glob.sync('./!(node_modules)/**/*.vue', { cwd });
  const dependencies = Object.keys(pkg.dependencies || {});
  const language = tsFiles.length > 0 ? 'typescript' : '';
  let dsl = '';

  // dsl判断
  if (reactFiles.length > 0 || dependencies.some((name) => /^react(-|$)/.test(name))) {
    dsl = 'react';
  } else if (vueFiles.length > 0 || dependencies.some((name) => /^vue(-|$)/.test(name))) {
    dsl = 'vue';
  }

  return 'ise-fe-eslint-config/' + `${language}/${dsl}`.replace(/\/$/, '/index').replace(/^\//, '');
}
