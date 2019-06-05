/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
import {
  Children,
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
  let len = end - start
  return `${word.substring(0, start)}${'*'.repeat(len)}${word.substring(end)}`
}

class Mint extends Tree {
  constructor(keywordsPath?: string) {
    if (instance) return instance
    super()

    // 创建Trie树
    let keywords: Array<string> = getAllKeywords(keywordsPath)

    for (let item of keywords) {
      if (!item) continue
      this.insert(item)
    }

    this._createFailureTable()

    instance = this
  }

  _filterFn(word: string): FilterValue {
    let startIndex = 0
    let endIndex = startIndex
    const wordLen = word.length
    let filterText: string = word
    let filterKeywords: Array<string> = []
    word = word.toLocaleUpperCase()

    // 正在进行划词判断
    let isJudge: boolean = false
    let currNode: Node = this.root
    let nextNode: Node | boolean

    for (endIndex; endIndex <= wordLen; endIndex++) {
      let key: string = word[endIndex]
      // if (key) continue

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
        }
        isJudge = false
        currNode = this.root
      }


      startIndex = endIndex
    }


    /*for (let i = 0; i < wordLen; i++) {
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
        // 有子节点
        startIndex = i
        isJudge = true
      } else {
        // 没有子节点

        if () {

        }


        if (startIndex !== endIndex && prevNode.word) {
          filterText = replaceAt(filterText, startIndex, endIndex)
          filterKeywords.push(word.slice(startIndex, endIndex + 1))
        }
        startIndex = endIndex = i
        isJudge = false
      }
    }*/

    return {
      text: filterText,
      filter: [...new Set(filterKeywords)]
    }
  }

  // 过滤同步
  filterSync(word: string): FilterValue {
    return this._filterFn(word)
  }

  // 过滤
  async filter(word: string): Promise<FilterValue> {
    return Promise.resolve(this._filterFn(word))
  }
}

export = Mint

if (require.main === module) {
  (async function f() {
    let m = new Mint()

    /*setInterval(function () {
      console.time('1')
      console.log(m.filterSync(`1AABC2SBCSBC${new Date()}`))
      console.timeEnd('1')
    }, 1000)*/

  }())
}
