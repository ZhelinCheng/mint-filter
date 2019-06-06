"use strict";
/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: node
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