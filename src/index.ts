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

    // 正在进行划词判断
    let isJudge: boolean = false
    let judgeText: string = ''

    // 上一个Node与下一个Node
    let prevNode: Node = this.root
    let currNode: Node | boolean

    for (endIndex; endIndex <= wordLen; endIndex++) {
      let key: string = word[endIndex]
      let originalKey: string = originalWord[endIndex]
      currNode = this.search(key, prevNode.children)

      if (isJudge && currNode) {
        if (replace) judgeText += originalKey
        prevNode = currNode
        continue
      } else if (isJudge && prevNode.word) {
        isPass = false
        if (every) break

        if (replace) filterText += '*'.repeat(endIndex - startIndex)
        filterKeywords.push(word.slice(startIndex, endIndex))
      } else if (replace) {
        filterText += judgeText
      }

      if (!currNode) {
        // 直接在分支上找不到，需要走failure
        let failure: Node = prevNode.failure

        while (failure) {
          currNode = this.search(key, failure.children)
          if (currNode) break
          failure = failure.failure
        }
      }

      if (currNode) {
        judgeText = originalKey
        isJudge = true
        prevNode = currNode
      } else {
        judgeText = ''
        isJudge = false
        prevNode = this.root
        if (replace && key !== undefined) filterText += originalKey
      }
      startIndex = endIndex
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

/* if (require.main === module) {
  let m = new Mint(['拼多多', '淘宝', '京东', 'TEST', 'aaaa', 12345])
  console.log(m.filterSync('双十一在淘宝买东西，618在京东买东西，当然你也可以在拼多多买东西。'))
  console.log(m.filterSync('这是另外的TEST字符串，aaaa也是敏感词，123456中也有敏感词'))
  console.log(m.everySync('测试这条语句是否能通过，加上任意一个关键词京东'))
  console.log(m.includes('测试这条语句是否能通过，加上任意一个关键词京东'))
} */
