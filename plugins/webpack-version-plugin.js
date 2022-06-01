/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const { ConcatSource } = require("webpack-sources");
class WebpackVersionPlugin {
  constructor(options = {}) {
    // 配置文件
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("VersionPlugin", (compilation) => {
      compilation.hooks.processAssets.tap("VersionPlugin", () => {
        for (const chunk of compilation.chunks) {
          for (const file of chunk.files) {
            // 定义注释的内容
            const comment = `/* ${this.options.comment} */`;
            compilation.updateAsset(file, (old) => {
                console.log(comment)
                console.log(old)
              // 把注释和旧代码进行拼接
              return new ConcatSource(comment, "\n", old);
            });
          }
        }
      });
    });
  }
}

module.exports = WebpackVersionPlugin;
