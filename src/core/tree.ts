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

    if (key.length > 1) {
      this.insertNode(this.root, key.split(''))
    } else if (!this.root[key]) {
      this.root[key] = new Node(key)
    }

    return true
  }

  /**
   * 插入节点
   * @param node
   * @param word
   */
  insertNode (node: Children, word: string[]) {
    let len = word.length
    if (len) {
      let key = word.shift()
      if (!node[key]) {
        node[key] = new Node(key, len === 1)
      }
      this.insertNode(node[key].children, word)
    }
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
