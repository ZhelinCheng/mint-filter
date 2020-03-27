/*
 * @Author: Zhelin Cheng
 * @Date: 2020-03-27 10:28:06
 * @LastEditTime: 2020-03-27 13:24:48
 * @LastEditors: Zhelin Cheng
 * @Description:
 */
// rollup.config.js
// umd
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { uglify } = require('rollup-plugin-uglify')
const babel = require('rollup-plugin-babel');
const common = require('./rollup.js')

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  input: 'src/index.ts',
  output: {
    file: prod ? 'dist/index.aio.min.js' : 'dist/index.aio.js',
    format: 'umd',
    // When export and export default are not used at the same time, set legacy to true.
    // legacy: true,
    name: common.name,
    banner: common.banner,
  },
  plugins: [
    nodeResolve({
      main: true,
      extensions: ['.ts', '.js']
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel(),
    common.getCompiler(),
    (prod && uglify())
  ]
}
