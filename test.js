/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-28 11:25:30
 * @LastEditTime: 2019-11-28 11:28:00
 * @LastEditors: Zhelin Cheng
 * @Description:
 */
const arr = require('./test.json')
const Mint = require('./dist/index')
const m = new Mint(arr)

console.log(m)
