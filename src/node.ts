/*
 * @Author       : 程哲林
 * @Date         : 2023-02-22 14:28:25
 * @LastEditors  : 程哲林
 * @LastEditTime : 2023-02-22 21:57:38
 * @FilePath     : /mint-filter/src/node.ts
 * @Description  : 未添加文件描述
 */

type NodeOptions = {
  children: Node;
  word: boolean;
};

export default class Node {
  // 节点值
  public key: string;
  // 是否为单词最后节点
  public word: boolean;
  // 父节点的引用
  // public parent?: Node;
  // 子节点的引用（goto表）
  public children: Record<string, Node> = {};
  // failure表，用于匹配失败后的跳转
  public failure?: Node;
  count = 0;

  constructor(key: string, ops?: NodeOptions) {
    this.key = key;
    this.word = ops?.word || false;

    if (ops?.children) {
      this.children[ops.children.key] = ops.children;
    }
  }
}
