/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
import Tree from './core/tree'
import Node from './core/node'

let instance: Mint | undefined = undefined
interface FilterValue {
  text?: string | boolean
  filter: Array<string>,
  pass?: boolean
}

function replaceAt(word: string, start: number, end: number): string {
  let len = end - start
  return `${word.substring(0, start)}${'*'.repeat(len)}${word.substring(end)}`
}

class Mint extends Tree {
  constructor(keywords: Array<string>) {
    if (instance) return instance
    super()

    // 创建Trie树
    // let keywords: Array<string> = getAllKeywords(keywordsPath)

    if (!(keywords instanceof Array)) {
      throw Error('实例参数必须是一个数组')
    }


    for (let item of keywords) {
      if (!item) continue
      this.insert(item)
    }

    this._createFailureTable()

    instance = this
  }

  _filterFn(word: string, every?: boolean): FilterValue {
    let startIndex = 0
    let endIndex = startIndex
    const wordLen = word.length
    let filterText: string = word
    let filterKeywords: Array<string> = []
    word = word.toLocaleUpperCase()

    // 是否通过，无敏感词
    let isPass = true

    // 正在进行划词判断
    let isJudge: boolean = false
    let currNode: Node = this.root
    let nextNode: Node | boolean

    for (endIndex; endIndex <= wordLen; endIndex++) {
      let key: string = word[endIndex]
      // if (!key) continue
      nextNode = this.search(key, currNode.children)

      if (isJudge && nextNode) {
        currNode = nextNode
        continue
      }

      if (!nextNode) {
        // 直接在分支上找不到，需要走failure
        let failure: Node = currNode.failure
        while (failure) {
          nextNode = this.search(key, failure.children)
          if (nextNode) { break }
          failure = failure.failure
        }
      }

      if (nextNode) {
        currNode = nextNode
        isJudge = true
      } else {
        if (startIndex !== endIndex && currNode.word) {
          filterText = replaceAt(filterText, startIndex, endIndex)
          filterKeywords.push(word.slice(startIndex, endIndex))
          isPass = false
          if (every) break
        }
        isJudge = false
        currNode = this.root
      }

      startIndex = endIndex
    }

    return {
      text: filterText,
      filter: [...new Set(filterKeywords)],
      pass: isPass
    }
  }

  /**
   * 异步快速检测字符串是否无敏感词
   * @param word
   */
  every (word: string): Promise<boolean> {
    return Promise.resolve(this._filterFn(word, true).pass)
  }

  /**
   * 同步快速检测字符串是否无敏感词
   * @param word
   */
  everySync (word: string): boolean {
    return this._filterFn(word, true).pass
  }

  /**
   * 同步过滤方法
   * @param word
   */
  filterSync(word: string): FilterValue {
    return this._filterFn(word)
  }

  /**
   * 异步过滤方法
   * @param word
   */
  async filter(word: string): Promise<FilterValue> {
    return Promise.resolve(this._filterFn(word))
  }
}

export = Mint

if (require.main === module) {
  let m = new Mint(['敏感词'])
  m.filter('这是一个敏感词字符串')
    .then(data => {
      console.log(data)
    })
}

