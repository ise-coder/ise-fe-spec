import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';
import { execSync } from 'child_process';
import update from './update';
import npmType from '../utils/npm-type';
import log from '../utils/log';
import conflictResolve from '../utils/conflict-resolve';
import generateTemplate from '../utils/generate-template';
import { PROJECT_TYPES, PKG_NAME } from '../constants/common';
import type { InitOptions, PKG } from '../types';

let step = 0;

/**
 * 选择项目语言和框架
 */
const chooseEslintType = async (): Promise<string> => {
  const { type } = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: `Step ${++step}. 请选择项目的语言（JS/TS）及类型（Vue/React/Node）：`,
    choices: PROJECT_TYPES,
  });

  return type;
};

/**
 * 选择是否启用 stylelint
 * @param defaultValue
 */
const chooseEnableStylelint = async (defaultValue: boolean): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 stylelint（若没有样式文件则不需要）：`,
    default: defaultValue,
  });

  return enable;
};

/**
 * 选择是否启用 markdownlint
 */
const chooseEnableMarkdownLint = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 markdownlint（若没有 Markdown 文件则不需要）：`,
    default: true,
  });

  return enable;
};

/**
 * 选择是否启用 prettier
 */
const chooseEnablePrettier = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 Prettier 格式化代码：`,
    default: true,
  });

  return enable;
};

// 入口
export default async (options: InitOptions) => {
  const cwd = options.cwd || process.cwd();
  const isTest = process.env.NODE_ENV === 'test';
  const checkVersionUpdate = options.checkVersionUpdate || false;
  const disableNpmInstall = options.disableNpmInstall || false;
  const config: Record<string, any> = {};
  const pkgPath = path.resolve(cwd, 'package.json');
  let pkg: PKG = fs.readJSONSync(pkgPath);

  // 版本检查
  if (!isTest && checkVersionUpdate) {
    await update(false);
  }

  // 初始化 `enableESLint`，默认为 true，无需让用户选择
  if (typeof options.enableESLint === 'boolean') {
    config.enableESLint = options.enableESLint;
  } else {
    config.enableESLint = true;
  }

  // 初始化 `eslintType`
  if (options.eslintType && PROJECT_TYPES.find((choice) => choice.value === options.eslintType)) {
    config.eslintType = options.eslintType;
  } else {
    config.eslintType = await chooseEslintType();
  }

  // 初始化 `enableStylelint`
  if (typeof options.enableStylelint === 'boolean') {
    config.enableStylelint = options.enableStylelint;
  } else {
    config.enableStylelint = await chooseEnableStylelint(!/node/.test(config.eslintType));
  }

  // 初始化 `enableMarkdownlint`
  if (typeof options.enableMarkdownlint === 'boolean') {
    config.enableMarkdownlint = options.enableMarkdownlint;
  } else {
    config.enableMarkdownlint = await chooseEnableMarkdownLint();
  }

  // 初始化 `enablePrettier`
  if (typeof options.enablePrettier === 'boolean') {
    config.enablePrettier = options.enablePrettier;
  } else {
    config.enablePrettier = await chooseEnablePrettier();
  }

  log.info(`Step ${++step}. 写入配置文件`);
  generateTemplate(cwd, config);
  log.success(`Step ${step}. 写入配置文件成功 :D`);

  if (!isTest) {
    log.info(`Step ${++step}. 检查并处理项目中可能存在的依赖和配置冲突`);
    pkg = await conflictResolve(cwd, options.rewriteConfig);
    log.success(`Step ${step}. 已完成项目依赖和配置冲突检查处理 :D`);

    // 配置 husky
    pkg.scripts.preinstall = 'npx only-allow pnpm';
    pkg.scripts.prepare = 'husky';
    fs.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');

    if (!disableNpmInstall) {
      log.info(`Step ${++step}. 安装依赖`);
      const npm = await npmType;
      spawn.sync(npm, ['i', '-D', PKG_NAME], { stdio: 'inherit', cwd });
      log.success(`Step ${step}. 安装依赖成功 :D`);
    }

    // 配置 commit 卡点
    log.info(`Step ${++step}. 配置 git commit 卡点`);
    try {
      const npm = await npmType;
      // 初始化 husky 及配置 husky commit-msg 钩子
      execSync('npx husky init', { encoding: 'utf8' });
      execSync(`echo 'npx ${PKG_NAME} commit-msg-scan' > .husky/commit-msg`, {
        encoding: 'utf8',
      });
      execSync('chmod +x .husky/commit-msg', { encoding: 'utf8' });

      // 配置 husky pre-commit 钩子
      execSync(`echo 'npx ${PKG_NAME} commit-file-scan' > .husky/pre-commit`, {
        encoding: 'utf8',
      });
      execSync('chmod +x .husky/pre-commit', { encoding: 'utf8' });
      log.success(`Step ${step}. 配置 git commit 卡点成功 :D`);
    } catch (error) {
      log.error(`Step ${step}. 配置 git commit 卡点失败 :D`);
    }
  }

  // 完成信息
  const logs = [`${PKG_NAME} 初始化完成 :D`].join('\r\n');
  log.success(logs);
};
