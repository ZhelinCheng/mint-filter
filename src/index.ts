/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
import {
  getAllKeywords
} from './core'
import Tree from './core/tree'
import Node from './core/node'

let instance: Mint | undefined = undefined

interface FilterValue {
  text: string
  filter: Array<string>
}

function replaceAt(word: string, start: number, end: number): string {
  let len = end - start + 1
  return `${word.substring(0, start)}${'*'.repeat(len)}${word.substring(end + 1)}`
}

class Mint extends Tree {
  constructor (keywordsPath?: string) {
    if (instance) return instance

    super()

    // 创建Trie树
    let keywords: Array<string> = getAllKeywords(keywordsPath)

    for (let item of keywords) {
      if (!item) continue
      this.insert(item)
    }

    instance = this
  }

  _filterFn (word: string): FilterValue {
    let startIndex = 0
    let endIndex = startIndex
    const wordLen = word.length + 1

    // 正在进行划词判断
    let isJudge: boolean = false
    let node: Node | boolean = false
    let prevNode: Node
    let filterText: string = word
    let filterKeywords: Array<string> = []

    word = word.toLocaleUpperCase()

    for (let i = 0; i < wordLen; i++) {
      if (node instanceof Node) {
        prevNode = node
        node = this.search(word[i], node.children)
      } else {
        node = this.search(word[i])
      }

      // 正在划词判断且当前字也属于敏感字
      if (isJudge && node) {
        endIndex = i
        continue
      }

      if (node) {
        startIndex = i
        isJudge = true
      } else {
        if (startIndex !== endIndex && prevNode.word) {
          filterText = replaceAt(filterText, startIndex, endIndex)
          filterKeywords.push(word.slice(startIndex, endIndex + 1))
        }
        startIndex = endIndex = i
        isJudge = false
      }
    }

    return {
      text: filterText,
      filter: filterKeywords
    }
  }

  // 过滤同步
  filterSync (word: string): FilterValue {
    return this._filterFn(word)
  }

  // 过滤
  async filter (word: string): Promise<FilterValue> {
    return Promise.resolve(this._filterFn(word))
  }
}

export = Mint

if (require.main === module) {
  (async function f() {
    let m = new Mint()
    console.log(m.filterSync('测试'))
  }())
}
