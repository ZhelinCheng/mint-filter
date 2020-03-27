/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-27 11:48:52
 * @LastEditors: Zhelin Cheng
 * @Description: Tree
 */

import Node from './node'
import { Children } from './index'

export default class Tree {
  public root: Node

  constructor () {
    this.root = new Node('root', {
      depth: 0
    })
  }

  /**
   * 插入数据
   * @param key
   */
  insert (key: string): boolean {
    if (!key) return false
    const keyArr = key.split('').reverse()
    const firstKey = keyArr.pop()
    const children = this.root.children
    const len = keyArr.length
    const firstNode = children[firstKey]

    // 第一个key
    if (!firstNode) {
      children[firstKey] = len
        ? new Node(firstKey)
        : new Node(firstKey, {
          word: true
        })
    } else if (!len) {
      firstNode.word = true
    }

    // 其他多余的key
    if (len >= 1) {
      this.insertNode(children[firstKey], keyArr, len + 1)
    }

    return true
  }

  /**
   * 插入节点
   * @param node
   * @param word
   */
  insertNode (node: Node, word: string[], starLen: number): void {
    const len = word.length

    if (len) {
      const children: Children = node.children

      const key = word.pop()
      let item = children[key]
      const isWord = len === 1

      if (!item) {
        item = new Node(key, {
          parent: node,
          word: isWord,
          depth: starLen - len + 1
        })
      } else if (!item.word) {
        item.word = isWord
      }

      children[key] = item
      this.insertNode(item, word, starLen)
    }
  }

  /**
   * 创建Failure表
   */
  createFailureTable (): void {
    // 获取树第一层
    let currQueue: Array<Node> = Object.values(this.root.children)
    while (currQueue.length > 0) {
      const nextQueue: Array<Node> = []
      for (let i = 0; i < currQueue.length; i++) {
        const node: Node = currQueue[i]
        const key = node.key
        const parent = node.parent
        node.failure = this.root
        // 获取树下一层
        for (const k in node.children) {
          nextQueue.push(node.children[k])
        }

        if (parent) {
          let failure: Node = parent.failure
          while (failure) {
            const children: Node = failure.children[key]

            // 判断是否到了根节点
            if (children) {
              node.failure = children
              break
            }
            failure = failure.failure
          }
        }
      }

      currQueue = nextQueue
    }
  }

  /**
   * 搜索节点
   * @param key
   * @param node
   */
  search (key: string, node: Children = this.root.children): Node | undefined {
    return node[key]
  }
}
