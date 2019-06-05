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

  _createFailureTable () {
    // 获取树第一层
    let currQueue: Array<Node> = Object.values(this.root)

    while (currQueue.length > 0) {
      let nextQueue: Array<Node> = []

      for (let i = 0; i < currQueue.length; i++) {
        let node: Node = currQueue[i]
        let key = node.key
        let parent = node.parent
        // 获取树下一层
        for (let k in node.children) {
          nextQueue.push(node.children[k])
        }

        if (parent) {
          let failure = parent.failure
          console.log(key, failure)

          /*let child = failure.next[node.val]
          if (child) {
            node.back = child
            break
          }*/
          // back = back.back


          /*// 如果有父节点
          // 获取父节点的fail节点
          let parentFail = parent.failure

          // 获取父节点Fail的子节点
          let parentFailChild: any = parentFail.children

          // 当parentFail指向树第一层时，指向的是root
          if (!parentFailChild) {
            parentFailChild = parentFail
          }

          if (parentFailChild[key]) {
            return parentFail
          } else {
            console.log(key)
          }*/
        } else {
          node.failure = this.root
        }
      }

      currQueue = nextQueue
    }
  }

  _filterFn(word: string): FilterValue {
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
        // console.log(word[i])
        startIndex = i
        isJudge = true
      } else {
        // console.log(startIndex, endIndex)
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
  filterSync(word: string): FilterValue {
    return this._filterFn(word)
  }

  // 过滤
  async filter(word: string): Promise<FilterValue> {
    return Promise.resolve(this._filterFn(word))
  }
}


setInterval(() => {
  // console.log(111)
}, 1000000000)

let m = new Mint()
// console.log(m)
// console.log(m)

export = Mint

if (require.main === module) {
  (async function f() {
    // let m = new Mint()

    // console.log(m.root['A'].children['B'].children['C'])

    // console.log(m.root['A'])

    // console.log(m.filterSync(`ABCCCCAB`))

    /*setInterval(function () {
      console.time('时间：')
      console.log(m.filterSync(`一法轮功测试法轮功${new Date().getTime()}`))
      console.timeEnd('时间：')
    }, 1000)*/
  }())
}
