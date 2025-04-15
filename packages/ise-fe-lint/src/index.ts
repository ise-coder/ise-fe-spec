import ora from 'ora';
import type { InitOptions, ScanOptions } from './types';
import initAction from './actions/init';
import printReport from './utils/print-report';
import { PKG_NAME } from './constants/common';
import scanAction from './actions/scan';

type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>;

/**
 * 初始化
 * @param options
 * @returns
 */
export const init = async (options: IInitOptions) => {
  return await initAction({
    ...options,
    checkVersionUpdate: false,
  });
};

export const scan = async (options: ScanOptions) => {
  const checking = ora();
  checking.start(`执行 ${PKG_NAME} 代码检查`);

  const report = await scanAction(options);
  const { results, errorCount, warningCount } = report;
  let type = 'succeed';
  if (errorCount > 0) {
    type = 'fail';
  } else if (warningCount > 0) {
    type = 'warn';
  }

  checking[type]();
  if (results.length > 0) printReport(results, false);

  return report;
};
