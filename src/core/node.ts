/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-11-28 12:36:58
 * @LastEditors: Zhelin Cheng
 * @Description: Node
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
