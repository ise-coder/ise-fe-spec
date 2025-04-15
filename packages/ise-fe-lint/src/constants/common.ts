const packageJson = require('../../package.json');

/**
 * 读取 package.json
 */
const pkg: Record<string, any> = packageJson;

/**
 * 包名
 */
export const PKG_NAME: string = pkg.name;

/**
 * 包版本号
 */
export const PKG_VERSION: string = pkg.version;

/**
 * unicode 编码
 */
export enum UNICODE {
  success = '\u2714', // ✔
  failure = '\u2716', // ✖
}

/**
 * eslint 扫描忽略的文件或文件目录
 * 需要同步到 config/.eslintignore.ejs
 */
export const ESLINT_IGNORE_PATTERN: string[] = [
  'node_modules',
  'build',
  'dist',
  'coverage',
  'es',
  'lib',
  '**/*.min.js',
  '**/*-min.js',
  '**/*.bundle.js',
];

/**
 * stylelint 扫描文件扩展名
 */
export const STYLELINT_FILE_EXT: string[] = ['.css', '.scss', '.less', '.acss'];

/**
 * stylelint 扫描忽略的文件或文件目录
 */
export const STYLELINT_IGNORE_PATTERN: string[] = [
  'node_modules/',
  'build/',
  'dist/',
  'coverage/',
  'es/',
  'lib/',
  '**/*.min.css',
  '**/*-min.css',
  '**/*.bundle.css',
];

/**
 * markdownLint 扫描文件扩展名
 */
export const MARKDOWN_LINT_FILE_EXT: string[] = ['.md'];

/**
 * markdownLint 扫描忽略的文件或文件目录
 */
export const MARKDOWN_LINT_IGNORE_PATTERN: string[] = [
  'node_modules/',
  'build/',
  'dist/',
  'coverage/',
  'es/',
  'lib/',
];

/**
 * 项目类型
 */
export const PROJECT_TYPES: Array<{ name: string; value: string }> = [
  {
    name: '纯 JS 项目',
    value: 'index',
  },
  {
    name: 'JS + Vue 项目',
    value: 'vue',
  },
  {
    name: 'JS + React 项目',
    value: 'react',
  },
  {
    name: 'JS + Node.js 项目',
    value: 'node',
  },
  {
    name: '纯 TS 项目',
    value: 'typescript',
  },
  {
    name: 'TS + Vue 项目',
    value: 'typescript/vue',
  },
  {
    name: 'TS + React 项目',
    value: 'typescript/react',
  },
  {
    name: 'TS + Node.js 项目',
    value: 'typescript/node',
  },
];

/**
 * eslint 扫描文件扩展名
 */
export const ESLINT_FILE_EXT: string[] = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

/**
 * Prettier 扫描文件扩展名
 */
export const PRETTIER_FILE_EXT = [
  ...STYLELINT_FILE_EXT,
  ...ESLINT_FILE_EXT,
  ...MARKDOWN_LINT_FILE_EXT,
];

/**
 * Prettier 扫描忽略的文件或文件目录
 */
export const PRETTIER_IGNORE_PATTERN: string[] = [
  'node_modules/**/*',
  'build/**/*',
  'dist/**/*',
  'lib/**/*',
  'es/**/*',
  'coverage/**/*',
];
