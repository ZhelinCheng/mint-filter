/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: node
 */

interface Children {
  [key: string]: Node
}

export default class Node {
  // 节点值
  public key: string
  // 是否为单词最后节点
  public word: boolean
  // 子节点的引用
  public children: Children = {}

  constructor (key: string, word: boolean = false) {
    // this.key = key
    this.word = word
  }
}
