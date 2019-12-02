/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-12-02 15:09:35
 * @LastEditors: Zhelin Cheng
 * @Description: 主文件
 */

import { Node, Tree } from './core'

export interface FilterValue {
  text?: string | boolean
  filter: Array<string | undefined>,
  pass?: boolean
}

class Mint extends Tree {
  // 是否替换原文本敏感词
  constructor(keywords: Array<string | number>) {
    super()
    if (!(keywords instanceof Array && keywords.length >= 1)) {
      throw Error('Mint：敏感词keywords应该是一个数组！')
    }

    // 创建Trie树
    for (let item of keywords) {
      if (!item) continue
      item = item.toString()
      if (/[a-z]/i.test(item)) {
        // 有字母
        this.insert(item.toLocaleUpperCase())
      } else {
        this.insert(item)
      }
    }

    this.createFailureTable()
  }

  private searchKey() {

  }

  private filterFunc(word: string, every: boolean = false, replace: boolean = true): FilterValue {
    let startIndex = 0
    let endIndex = startIndex
    const wordLen = word.length
    let originalWord: string = word
    let filterKeywords: Array<string> = []
    word = word.toLocaleUpperCase()

    // 保存过滤文本
    let filterTextArr: string[] = []
    let keyword: string[] = []

    // 是否通过，无敏感词
    let isPass = true

    // 下一个Node与当前Node
    let searchNode: Node = this.root
    // let currNode: Node | boolean

    // 是否开始匹配
    let isStart = false

    while (endIndex < wordLen) {
      let key: string = word[endIndex]
      let nextNode: Node | boolean = this.search(key, searchNode.children)
      filterTextArr[endIndex] = key

      // console.log(endIndex, key)
      // 判断是否找到
      if (nextNode) {
        // keywords += nextNode.key

        if (!isStart) {
          isStart = true
          startIndex = endIndex
        }

        if (nextNode.word) {
          // console.log('==>', key, startIndex, endIndex)
          const keywordLen = endIndex - startIndex + 1
          isStart = isPass = false
          keyword = filterTextArr.splice(startIndex, keywordLen, '*'.repeat(keywordLen))
          filterKeywords.push(keyword.join(''))
          nextNode = false
          if (every) break
        }
      } else if (isStart) {
        isStart = false
        // 在失配路线上找到子元素
        searchNode = searchNode.failure
        nextNode = this.search(key, searchNode.children)
        if (nextNode && searchNode.key !== 'root') {
          startIndex = endIndex - 1
          isStart = isPass = true
          nextNode = searchNode
        } else {
          nextNode = false
        }
        endIndex--
      } else {
        isStart = false
      }

      searchNode = nextNode || searchNode.failure || this.root
      endIndex++
    }

    return {
      text: replace ? filterTextArr.join('') : originalWord,
      filter: [...new Set(filterKeywords)],
      pass: isPass
    }
  }

  /**
   * 异步快速检测字符串是否无敏感词
   * @param word
   */
  every(word: string): Promise<boolean> {
    return Promise.resolve(this.filterFunc(word, true).pass)
  }

  /**
   * 同步快速检测字符串是否无敏感词
   * @param word
   */
  validator(word: string): boolean {
    return !this.filterFunc(word, true).pass
  }

  everySync(word: string): boolean {
    return this.filterFunc(word, true).pass
  }

  /**
   * 同步过滤方法
   * @param word
   * @param replace
   */
  filterSync(word: string, replace: boolean = true): FilterValue {
    return this.filterFunc(word, false, replace)
  }

  /**
   * 异步过滤方法
   * @param word
   * @param replace
   */
  async filter(word: string, replace: boolean = true): Promise<FilterValue> {
    return Promise.resolve(this.filterFunc(word, false, replace))
  }
}

export default Mint

if (require.main === module) {
  let m = new Mint(['多', '多少'])
  console.log(m.filterSync(`多多少`))
  // let m = new Mint(['多少', '少'])
  // console.log(m.filterSync(`多少少`))
}
