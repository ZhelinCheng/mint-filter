/*
 * @Author: Zhelin Cheng
 * @Date: 2020-03-27 10:28:06
 * @LastEditTime: 2020-03-27 11:51:25
 * @LastEditors: Zhelin Cheng
 * @Description:
 */

const typescript = require('rollup-plugin-typescript2');

const pkg = require('../package.json');

const version = pkg.version;

const banner =
  `/*!
 * ${pkg.name} ${version} (https://github.com/ZhelinCheng/mint-filter)
 * API https://github.com/ZhelinCheng/mint-filter/blob/master/doc/api.md
 * Copyright 2019-${(new Date).getFullYear()} Zhelin Cheng. All Rights Reserved
 * Licensed under MIT (https://github.com/ZhelinCheng/mint-filter/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
  opt = opt || {
    tsconfigOverride: { compilerOptions: { module: 'ES2015', declaration: false } }
  }
  return typescript(opt);
}

exports.name = 'mint';
exports.banner = banner;
exports.getCompiler = getCompiler;
