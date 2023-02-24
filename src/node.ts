/*
 * @Author       : 程哲林
 * @Date         : 2023-02-22 14:28:25
 * @LastEditors  : 程哲林
 * @LastEditTime : 2023-02-24 14:16:08
 * @FilePath     : /mint-filter/src/node.ts
 * @Description  : 未添加文件描述
 */

type NodeOptions = {
  children: Node;
  word: boolean;
};

export default class Node {
  // 深度
  public depth = 0;
  // 节点值
  public key: string;
  // 是否为单词最后节点
  public word: boolean;
  // 父节点的引用
  // public parent?: Node;
  // 子节点的引用（goto表）
  public children: Record<string, Node> = {};
  // failure表，用于匹配失败后的跳转
  public fail?: Node;
  // 引用计数
  public count = 0;

  constructor(key: string, depth = 0, ops?: NodeOptions) {
    this.key = key;
    this.word = ops?.word || false;
    this.depth = depth;

    if (ops?.children) {
      this.children[ops.children.key] = ops.children;
    }
  }
}
