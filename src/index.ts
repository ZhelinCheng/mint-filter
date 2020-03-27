/*
 * @Author: Zhelin Cheng
 * @Date: 2020-03-27 15:14:57
 * @LastEditTime: 2020-03-27 15:26:45
 * @LastEditors: Zhelin Cheng
 * @Description:
 */

const test1: { [key: string]: number } = { a: 1, b: 3 }

const test2 = Object.assign({}, test1)

const test3 = new Set([1, 3, 4])

console.log(test2, test3)
