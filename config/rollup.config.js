/*
 * @Author: Zhelin Cheng
 * @Date: 2020-03-27 10:28:06
 * @LastEditTime: 2020-03-27 15:24:37
 * @LastEditors: Zhelin Cheng
 * @Description:
 */
// rollup.config.js
// commonjs
const common = require('./rollup.js')
const { resolve } = require('path')
const babel = require('rollup-plugin-babel')

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    // When export and export default are not used at the same time, set legacy to true.
    // legacy: true,
    banner: common.banner
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['@babel/preset-env', {
        modules: false,
        targets: {
          chrome: 46,
          ie: 9
        }
      }]],
      runtimeHelpers: true,
      plugins: ['@babel/plugin-transform-runtime', { corejs: 3 }]
    }),
    common.getCompiler({
      tsconfigOverride: { compilerOptions: { declaration: true, declarationDir: resolve(__dirname, '../types'), module: 'ES2015' } },
      useTsconfigDeclarationDir: true
    })
  ]
}
