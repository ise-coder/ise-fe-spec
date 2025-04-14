import { sync as commandExistsSync } from 'command-exists';

/**
 * 获取 npm 类型，目前只支持 npm、pnpm 两种类型
 */
const promise: Promise<'npm' | 'pnpm'> = new Promise((resolve) => {
  if (!commandExistsSync('pnpm')) return resolve('npm');

  resolve('pnpm');
});

export default promise;
