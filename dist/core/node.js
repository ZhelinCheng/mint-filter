"use strict";
/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: node
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(key, word = false) {
        // 子节点的引用
        this.children = {};
        this.key = key;
        this.word = word;
    }
}
exports.default = Node;
//# sourceMappingURL=node.js.map