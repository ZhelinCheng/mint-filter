/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: tree
 */

import Node from './node'

interface Children {
  [key: string]: Node
}

export default class Tree {
  public root: Children = {}
  constructor () {}

  /**
   * 插入数据
   * @param key
   */
  insert (key: string): boolean {
    if (!key) return false
    let keyArr = key.split('')
    let firstKey = keyArr.shift()

    // 第一个key
    if (!this.root[firstKey]) {
      this.root[firstKey] = new Node(firstKey, this.root)
    }

    // 其他多余的key
    if (keyArr.length >= 1) {
      this.insertNode(this.root[firstKey], keyArr)
    }

    return true
  }

  /**
   * 插入节点
   * @param node
   * @param word
   */
  insertNode (node: Node, word: string[]) {
    let len = word.length

    if (len) {
      let children: Children
      children = node.children

      const key = word.shift()
      let item = children[key]
      const isWord = len === 1

      if (!item) {
        if (key === 'B') {
          console.log(node, key)
        }
        let failure = this.createFailureTable(node, key)
        item = new Node(key, failure, node, isWord)
      } else {
        item.word = isWord
      }

      children[key] = item
      this.insertNode(children[key], word)
    }
  }

  /**
   * 创建Failure表
   */
  createFailureTable (node: Node | Children, key: string): Node | Children {
    const failure = node.failure
    let children
    const isFailNode = failure instanceof Node
    const isNode = node instanceof Node



    /*if (isNode) {
      children = failure.children
    } else {
      children = node.children
    }

    if (key === 'B') {
      console.log(node)
    }*/

    /*if (children[key]) {
      return failure
    } else if (isNode) {
      this.createFailureTable(failure, key)
    } else {
      return children
    }*/

    return
  }

  /**
   * 搜索节点
   * @param key
   * @param node
   */
  search (key: string, node: Children = this.root): Node | boolean {
    const val: Node | undefined = node[key]
    if (val) return val
    else return false
  }
}
