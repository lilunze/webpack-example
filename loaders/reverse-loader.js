/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
// 自定义loader
// const interpolateName = require('loader-utils').interpolateName;
module.exports = function(source){
  if (source) {
    console.log("--- reverse-loader input:", source);
    source = source.split("").reverse().join("");
    console.log("--- reverse-loader output:", source);
  }
  return `module.exports = '${source}'`
  // const url = interpolateName(this,'[name][hash].[ext]',{content: source})
  // this.emitFile(url, source)
  // return `module.exports = '${url}'`;
};
