"use strict";
/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-08 15:09:46
 * @LastEditors: Zhelin Cheng
 * @Description: Node
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(key, options) {
        if (options === void 0) { options = {}; }
        // 子节点的引用（goto表）
        this.children = {};
        // failure表，用于匹配失败后的跳转
        this.failure = undefined;
        // 字符深度
        this.depth = 0;
        var parent = options.parent, word = options.word, depth = options.depth;
        this.key = key;
        this.parent = parent;
        this.word = word || false;
        this.depth = typeof depth === 'number' ? depth : 1;
    }
    return Node;
}());
exports.default = Node;
//# sourceMappingURL=node.js.map