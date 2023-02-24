/**
 * 使用  node ./time 10k 1
 * 10k代表字符长度
 * 1或者不填代表是否替换敏感词
 */

'use strict'
const argv = process.argv
const Mint = require('../dist/main/index').default
const path = require('path')
const fs = require('fs-extra')

function resolve (file) {
  return path.resolve(__dirname, file + '.txt')
}

function readFile (file) {
  return fs.readFileSync(file).toString('utf-8')
}

let keywords = fs.readFileSync(resolve('./keywords'))
keywords = keywords.toString('utf-8').split(/\r\n/)

const key = argv[2]
const replace = argv[3] > 0

console.log('========性能测试：实例化（包含构建树过程）========')
console.time(key + '关键词耗时：')
const m = new Mint(keywords)
console.timeEnd(key + '关键词耗时：')
const strBox = {}

strBox['1k'] = readFile(resolve('./1000'))
strBox['5k'] = readFile(resolve('./5000'))
strBox['10k'] = readFile(resolve('./10000'))
strBox['20k'] = readFile(resolve('./20000'))
strBox['50k'] = readFile(resolve('./50000'))
strBox['100k'] = readFile(resolve('./100000'))

console.log(`===== 性能测试，${replace ? '替换' : '不替换'}关键词 =====`)
console.time('耗时：')
m.filter(strBox[key], {
  replace
})
console.timeEnd('耗时：')
console.log(`===== 字符长度，${key} =====`)
