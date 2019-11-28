"use strict";
/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-11-28 12:36:58
 * @LastEditors: Zhelin Cheng
 * @Description: Node
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(key, parent = undefined, word = false) {
        // 子节点的引用（goto表）
        this.children = {};
        // failure表，用于匹配失败后的跳转
        this.failure = undefined;
        this.key = key;
        this.parent = parent;
        this.word = word;
    }
}
exports.default = Node;
//# sourceMappingURL=node.js.map