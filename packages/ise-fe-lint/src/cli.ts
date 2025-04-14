#!/usr/bin/env node
import path from 'path';
import { program } from 'commander';
import init from './actions/init';
import generateTemplate from './utils/generate-template';
import { PKG_NAME, PKG_VERSION } from './constants/common';

const cwd = process.cwd();

const initProgram = () => {
  program
    .name('ise-fe-lint')
    .version(PKG_VERSION)
    .description(
      `${PKG_NAME} 是 ISE 前端编码规范工程化的配套 Lint 工具，提供简单的 CLI 和 Node.js API，让项目能够一键接入，降低项目实施规范的成本`,
    );

  program
    .command('init')
    .description('一键接入：为项目初始化规范工具和配置，可以根据项目类型和需求进行定制')
    .option('--vscode', '写入.vscode/setting.json配置')
    .action(async (cmd) => {
      if (cmd.vscode) {
        const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`);
        generateTemplate(cwd, require(configPath), true);
      } else {
        await init({
          cwd,
          checkVersionUpdate: true,
        });
      }
    });

  // 解析命令行参数
  program.parse(process.argv);
};
initProgram();
