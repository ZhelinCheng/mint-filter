/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
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

  private searchKey () {

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

    // 是否通过，无敏感词
    let isPass = true

    // 下一个Node与当前Node
    let searchNode: Node = this.root
    let currNode: Node | boolean

    /* for (endIndex; endIndex <= wordLen; endIndex++) {
      let key: string = word[endIndex]
      currNode = this.search(key, prevNode.children)
    } */

    // 开始匹配
    let isStart = false

    while (endIndex < wordLen) {
      let key: string = word[endIndex]
      currNode = this.search(key, searchNode.children)
      // 判断是否找到
      if (currNode) {
        if (!isStart) {
          startIndex = endIndex
          isStart = true
        }

        if (isStart && currNode.word) {
          console.log(startIndex, endIndex, key)
          isStart = false
        }
      } else {
        // 如果没有匹配到
        currNode = searchNode.failure

        if (currNode) {
          const { key, word } = currNode
          isStart = false
          if (key !== 'root') {
            startIndex = endIndex - 1
            isStart = true
          }

          if (word) {
            console.log(startIndex, endIndex)
            isStart = false
          }
        }
      }

      searchNode = currNode || this.root
      // searchNode = currNode ? currNode : (searchNode.failure || this.root)
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
  /* let m = new Mint(['的', '我的天'])
  console.log(m.filterSync('开我的地，哈哈哈我的天')) */
  let m = new Mint(['拼多多', '淘宝', '京东', 'TEST', 'aaaa', 12345, '大龄哥吃饭', '大龄哥'])
  console.log(m.filterSync('双十一在买东西，618在京东买东西，当然你也可以在拼多多买东西。大龄哥买东西，大龄哥吃饭'))
  // console.log(m.filterSync('这是另外的TEST字符串，aaaa也是敏感词，123456中也有敏感词'))
  // console.log(m.everySync('测试这条语句是否能通过，加上任意一个关键词京东'))
  // console.log(m.includes('测试这条语句是否能通过，加上任意一个关键词京东')
}
