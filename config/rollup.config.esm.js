/*
 * @Author: Zhelin Cheng
 * @Date: 2020-03-27 10:28:06
 * @LastEditTime: 2020-03-27 13:24:40
 * @LastEditors: Zhelin Cheng
 * @Description:
 */
// rollup.config.js
// ES output
const common = require('./rollup.js');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.esm.js',
    format: 'es',
    // When export and export default are not used at the same time, set legacy to true.
    // legacy: true,
    banner: common.banner,
  },
  plugins: [
    babel(),
    common.getCompiler()
  ]
};
