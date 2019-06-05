"use strict";
/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: node
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(key, failure, parent = undefined, word = false) {
        // 子节点的引用（goto表）
        this.children = {};
        this.key = key;
        this.parent = parent;
        this.word = word;
        this.failure = failure;
    }
}
exports.default = Node;
//# sourceMappingURL=node.js.map