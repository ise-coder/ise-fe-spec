#!/usr/bin/env node
import path from 'path';
import { program } from 'commander';
import fs from 'fs-extra';
import glob from 'glob';
import ora from 'ora';
import { execSync } from 'child_process';
import spawn from 'cross-spawn';
import init from './actions/init';
import scan from './actions/scan';
import update from './actions/update';
import generateTemplate from './utils/generate-template';
import npmType from './utils/npm-type';
import log from './utils/log';
import printReport from './utils/print-report';
import { getCommitFiles, getAmendFiles } from './utils/git';
import { PKG_NAME, PKG_VERSION } from './constants/common';

const cwd = process.cwd();

/**
 * 若无 node_modules，则帮用户 install（否则会找不到 config）
 */
const installDepsIfThereNo = async () => {
  const lintConfigFiles = [].concat(
    glob.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.markdownlint(.@(yaml|yml|json))', { cwd }),
  );
  const nodeModulesPath = path.resolve(cwd, 'node_modules');

  if (!fs.existsSync(nodeModulesPath) && lintConfigFiles.length > 0) {
    const npm = await npmType;
    log.info(`使用项目 Lint 配置，检测到项目未安装依赖，将进行安装（执行 ${npm} install）`);
    execSync(`cd ${cwd} && ${npm} i`);
  }
};

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

  program
    .command('scan')
    .description('一键扫描：对项目进行代码规范问题扫描')
    .option('-q, --quiet', '仅报告错误信息 - 默认: false')
    .option('-o, --output-report', '输出扫描出的规范问题日志')
    .option('-i, --include <dirpath>', '指定要进行规范扫描的目录')
    .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
    .action(async (cmd) => {
      await installDepsIfThereNo();

      const checking = ora();
      checking.start(`执行 ${PKG_NAME} 代码检查`);

      const { results, errorCount, warningCount, runErrors } = await scan({
        cwd,
        fix: false,
        include: cmd.include || cwd,
        quiet: Boolean(cmd.quiet),
        outputReport: Boolean(cmd.outputReport),
        ignore: cmd.ignore, // 对应 --no-ignore
      });
      let type = 'succeed';
      if (runErrors.length > 0 || errorCount > 0) {
        type = 'fail';
      } else if (warningCount > 0) {
        type = 'warn';
      }

      checking[type]();
      if (results.length > 0) printReport(results, false);

      // 输出 lint 运行错误
      runErrors.forEach((e) => console.log(e));
    });

  program
    .command('fix')
    .description('一键修复：自动修复项目的代码规范扫描问题')
    .option('-i, --include <dirpath>', '指定要进行修复扫描的目录')
    .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
    .action(async (cmd) => {
      await installDepsIfThereNo();

      const checking = ora();
      checking.start(`执行 ${PKG_NAME} 代码修复`);

      const { results } = await scan({
        cwd,
        fix: true,
        include: cmd.include || cwd,
        ignore: cmd.ignore, // 对应 --no-ignore
      });

      checking.succeed();
      if (results.length > 0) printReport(results, true);
    });

  program
    .command('update')
    .description(`更新 ${PKG_NAME} 至最新版本`)
    .action(() => update(true));

  program
    .command('commit-msg-scan')
    .description('commit message 检查: git commit 时对 commit message 进行检查')
    .action(() => {
      // 获取当前目录下的提交信息文件路径，这里假设提交信息文件在项目根目录，实际需根据情况调整
      const commitMsgFilePath = path.join(process.cwd(), '.git/COMMIT_EDITMSG');

      const result = spawn.sync(
        'npx',
        ['--no-install', 'commitlint', '--edit', commitMsgFilePath],
        {
          stdio: 'inherit',
        },
      );

      if (result.status !== 0) {
        process.exit(result.status);
      }
    });

  program
    .command('commit-file-scan')
    .description('代码提交检查: git commit 时对提交代码进行规范问题扫描')
    .option('-s, --strict', '严格模式，对 warn 和 error 问题都卡口，默认仅对 error 问题卡口')
    .action(async (cmd) => {
      await installDepsIfThereNo();

      // git add 检查
      const files = await getAmendFiles();
      if (files) log.warn(`[${PKG_NAME}] changes not staged for commit: \n${files}\n`);

      const checking = ora();
      checking.start(`执行 ${PKG_NAME} 代码提交检查`);

      const { results, errorCount, warningCount } = await scan({
        cwd,
        include: cwd,
        quiet: !cmd.strict,
        files: await getCommitFiles(),
      });

      if (errorCount > 0 || (cmd.strict && warningCount > 0)) {
        checking.fail();
        printReport(results, false);
        process.exitCode = 1;
      } else {
        checking.succeed();
      }
    });

  // 解析命令行参数
  program.parse(process.argv);
};
initProgram();
