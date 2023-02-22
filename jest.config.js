/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-08-25 14:29:30
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-08-25 19:53:16
 * @FilePath     : /mini-crypto/jest.config.js
 * @Description  : 未添加文件描述
 */

'use strict'

module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.test.(ts|js)'
  ],
  testEnvironment: 'node'
}