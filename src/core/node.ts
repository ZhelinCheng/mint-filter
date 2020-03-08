/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-08 15:09:46
 * @LastEditors: Zhelin Cheng
 * @Description: Node
 */

import { Children } from './index'

interface NodeOptionsType {
  parent?: Node | undefined
  word?: boolean
  depth?: number
}

export default class Node {
  // 节点值
  public key: string
  // 是否为单词最后节点
  public word: boolean
  // 父节点的引用
  public parent: Node | undefined
  // 子节点的引用（goto表）
  public children: Children = {}
  // failure表，用于匹配失败后的跳转
  public failure: Node | undefined = undefined
  // 字符深度
  public depth: number = 0

  constructor (
    key: string,
    options: NodeOptionsType = {}
  ) {
    const { parent, word, depth } = options

    this.key = key
    this.parent = parent
    this.word = word || false
    this.depth = typeof depth === 'number' ? depth : 1
  }
}
