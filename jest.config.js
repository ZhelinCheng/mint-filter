/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-08-25 14:29:30
 * @LastEditors  : 程哲林
 * @LastEditTime : 2023-02-24 11:10:45
 * @FilePath     : /mint-filter/jest.config.js
 * @Description  : 未添加文件描述
 */

'use strict';

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
