/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-29 16:02:39
 * @LastEditTime: 2019-11-28 11:25:16
 * @LastEditors: Zhelin Cheng
 * @Description: 测试文件
 */
'use strict'

const Mint = require('../dist/index').default
const m = new Mint(['淘宝', '拼多多', '京东', 'TEST'])
console.log(m.filterSync('双十一在淘宝买东西，618在京东买东西，当然你也可以在拼多多买东西。'))
console.log(m.filterSync('这是另外的TEST字符串', {
  replaceWith: ''
}))
// console.log(m.everySync('测试这条语句是否能通过，加上任意一个关键词京东'))
