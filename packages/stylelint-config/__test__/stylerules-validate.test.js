const assert = require("assert");
const stylelint = require("stylelint");
const path = require("path");

// 提取公共的测试逻辑到一个函数
const runStylelintTest = async (filePath) => {
  const result = await stylelint.lint({
    configFile: path.join(__dirname, "../index.js"),
    files: [filePath],
    fix: false,
  });

  if (result && result.errored) {
    const filesResult = JSON.parse(result.output || "[]") || [];
    console.log("检测到错误：");
    filesResult.forEach(({ source, warnings }) => {
      console.log(`文件：${source}`);
      warnings.forEach(({ line, column, text, rule }) => {
        console.log(`  行 ${line} 列 ${column}：${text}（规则：${rule}）`);
      });
    });
    assert.ok(filesResult.length === 0);
  }
};

describe("test/stylerules-validate.test.js", () => {
  it("Validate default", async () => {
    const filePath = path.join(__dirname, "./fixtures/index.css");
    await runStylelintTest(filePath);
  });

  it("Validate sass", async () => {
    const filePath = path.join(__dirname, "./fixtures/sass-test.scss");
    await runStylelintTest(filePath);
  });

  it("Validate less", async () => {
    const filePath = path.join(__dirname, "./fixtures/sass-test.scss");
    await runStylelintTest(filePath);
  });

  it("Validate css-module", async () => {
    const filePath = path.join(__dirname, "./fixtures/css-module.scss");
    await runStylelintTest(filePath);
  });

  // it("Validate essential", async () => {
  //   const filePath = path.join(__dirname, "./fixtures/essential.css");
  //   await runStylelintTest(filePath);
  // });
});
