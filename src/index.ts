/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-11-29 17:25:02
 * @LastEditors: Zhelin Cheng
 * @Description: 主文件
 */

import { Node, Tree } from './core'

interface FilterValue {
  text?: string | boolean
  filter: Array<string>,
  pass?: boolean
}

class Mint extends Tree {
  /**
   * 兼容1.1.6
   */
  static default: any
  // 是否替换原文本敏感词
  constructor(keywords: Array<string | number>) {
    super()
    if (!(keywords instanceof Array && keywords.length >= 1)) {
      console.error('mint-filter：未将过滤词数组传入！')
      return
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
    let filterText: string = ''
    let keywords: string = ''

    // 是否通过，无敏感词
    let isPass = true

    // 下一个Node与当前Node
    let searchNode: Node = this.root
    // let currNode: Node | boolean

    // 是否开始匹配
    let isStart = false


    while (endIndex < wordLen) {
      let key: string = word[endIndex]
      let currNode: Node | boolean = this.search(key, searchNode.children)
      filterText += key
      // 判断是否找到
      if (currNode) {
        if (!isStart) {
          startIndex = endIndex
          isStart = true
          keywords = ''
        }

        // 是否匹配成功
        if (isStart && currNode.word) {
          isStart = isPass = false
          keywords += key
          console.log(startIndex, endIndex, key)
          // console.log('*'.repeat(keywords.length))
          filterKeywords.push(keywords)
        }
      } else if (isStart) {
        // 如果没有匹配到，走失配流程
        currNode = searchNode.failure
        key = currNode.key
        isStart = false
        keywords = ''

        if (key !== 'root') {
          startIndex = endIndex - 1
          isStart = true
        }

        // 是否匹配成功
        if (currNode.word) {
          console.log(startIndex, endIndex - 1, key)
          isStart = isPass = false
          keywords += key
          // console.log('*'.repeat(keywords.length))
          filterKeywords.push(keywords)
          endIndex -= 2
          // filterText = filterText.substr(0, startIndex) + '*'.repeat(keywords.length)
        }
      }

      if (isStart) keywords += key
      searchNode = currNode || this.root
      endIndex++
    }

    return {
      text: replace ? filterText : originalWord,
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
  includes(word: string): boolean {
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

// Mint.default = Mint

export = Mint

if (require.main === module) {
  let m = new Mint(['京东', '东京', '淘宝', '拼多多', '双十一', 1111, '优惠券', '京东优惠券', '多多'])
  console.log(m.filterSync(`
  这是简单的测试文字：
  1：
  这里的【京东京】是一段测试文字
  2：
  马上就要到双十一了，今年1111我屯了很多优惠券，
  有京东的，有淘宝的，也有拼多多的，
  但我最多的是京东优惠券。
  看来这个双十一我又要买很多东西了，毕竟多多益善。
  `))
}
