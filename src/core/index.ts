/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */


import glob from 'glob'
import path from 'path'
import fs from 'fs'
import Node from './node'
import Tree from './tree'

/**
 * 读取文件内容
 * @param path {string} 文件路径
 */
export function readFile(path: string): string {
  return fs.readFileSync(path).toString().trim()
}

/**
 * 获取所有敏感词
 */
export function getAllKeywords(selfPath?: string): any {
  if (selfPath) {
    let str: string = readFile(selfPath)
    return [...new Set(str.split(/\r\n|\n|\r/))]
  } else {
    let files: Array<string> = glob.sync(path.resolve(__dirname, '../../keywords/*.txt'))
    let results: string  = ''
    for (let file of files) {
      results = `${results}\r\n${readFile(file)}`
    }
    results = results.toLocaleUpperCase()
    return [...new Set(results.split(/\r\n|\n|\r/))]
  }
}
