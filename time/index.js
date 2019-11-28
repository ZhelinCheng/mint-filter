/**
 * Created by ChengZheLin on 2019/6/8.
 * Features:
 */

/**
 * 使用  node ./time 10k 1
 * 10k代表字符长度
 * 1或者不填代表是否替换敏感词
 */

'use strict'
const argv = process.argv
const Mint = require('../dist')
const { readFile, getAllKeywords } = require('../dist/core')
const path = require('path')

function resolve (file) {
  return path.resolve(__dirname, file + '.txt')
}

const keywords = getAllKeywords(resolve('./keywords'))

console.log('========性能测试：实例化（包含构建树过程）========')
console.time('20k关键词耗时：')
const m = new Mint(keywords)
console.timeEnd('20k关键词耗时：')
const strBox = {}

strBox['1k'] = readFile(resolve('./1000'))
strBox['5k'] = readFile(resolve('./5000'))
strBox['10k'] = readFile(resolve('./10000'))
strBox['20k'] = readFile(resolve('./20000'))
strBox['50k'] = readFile(resolve('./50000'))
strBox['100k'] = readFile(resolve('./100000'))

const key = argv[2]
const replace = argv[3] > 0

console.log(`===== 性能测试，${replace ? '替换' : '不替换'}关键词 =====`)
console.time('耗时：')
m.filterSync(strBox[key], replace)
console.timeEnd('耗时：')
console.log(`===== 字符长度，${key} =====`)
