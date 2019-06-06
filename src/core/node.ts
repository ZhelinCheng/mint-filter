/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: node
 */

import { Children } from './index'

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

  constructor (key: string, parent: Node | undefined = undefined, word: boolean = false) {
    this.key = key
    this.parent = parent
    this.word = word
  }
}
