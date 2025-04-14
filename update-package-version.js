const fs = require('fs');
const path = require('path');
const packagesDir = 'packages'; // 假设项目中存放包的目录名为packages，根据实际情况调整
const args = process.argv.slice(2);

const newVersion = args.length > 0 ? args[0] : '1.4.0'; // 设置想要更新到的版本号

/**
 * 子包的包版本实现统一更新
 */
const updatePackageVersion = () => {
  const packageDirs = fs.readdirSync(packagesDir);
  packageDirs.forEach((packageDir) => {
    const packageJsonPath = path.join(packagesDir, packageDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.version = newVersion;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
  });
};
updatePackageVersion();
