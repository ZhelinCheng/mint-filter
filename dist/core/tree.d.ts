/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: tree
 */
import Node from './node';
import { Children } from './index';
export default class Tree {
    root: Node;
    constructor();
    /**
     * 插入数据
     * @param key
     */
    insert(key: string): boolean;
    /**
     * 插入节点
     * @param node
     * @param word
     */
    insertNode(node: Node, word: string[]): void;
    /**
     * 创建Failure表
     */
    _createFailureTable(): void;
    /**
     * 搜索节点
     * @param key
     * @param node
     */
    search(key: string, node?: Children): Node | undefined;
}
