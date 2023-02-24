/*
 * @Author       : 程哲林
 * @Date         : 2023-02-22 14:28:25
 * @LastEditors  : 程哲林
 * @LastEditTime : 2023-02-24 21:30:02
 * @FilePath     : /mint-filter/src/node.ts
 * @Description  : 未添加文件描述
 */

export default class Node {
  // 深度
  public depth = 0;
  // 节点值
  public key: string;
  // 是否为单词最后节点
  public word = false;
  // 父节点的引用
  // public parent?: Node;
  // 子节点的引用（goto表）
  public children: Record<string, Node> = {};
  // failure表，用于匹配失败后的跳转
  public fail?: Node;
  // 引用计数
  public count = 0;

  constructor(key: string, depth = 0) {
    this.key = key;
    this.depth = depth;
  }
}
