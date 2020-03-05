"use strict";
/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-11-28 12:37:12
 * @LastEditors: Zhelin Cheng
 * @Description: Tree
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __importDefault(require("./node"));
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = new node_1.default('root');
    }
    /**
     * 插入数据
     * @param key
     */
    Tree.prototype.insert = function (key) {
        if (!key)
            return false;
        var keyArr = key.split('');
        var firstKey = keyArr.shift();
        var children = this.root.children;
        var len = keyArr.length;
        var firstNode = children[firstKey];
        // 第一个key
        if (!firstNode) {
            children[firstKey] = len
                ? new node_1.default(firstKey)
                : new node_1.default(firstKey, undefined, true);
        }
        else if (!len) {
            firstNode.word = true;
        }
        // 其他多余的key
        if (keyArr.length >= 1) {
            this.insertNode(children[firstKey], keyArr);
        }
        return true;
    };
    /**
     * 插入节点
     * @param node
     * @param word
     */
    Tree.prototype.insertNode = function (node, word) {
        var len = word.length;
        if (len) {
            var children = void 0;
            children = node.children;
            var key = word.shift();
            var item = children[key];
            var isWord = len === 1;
            if (!item) {
                item = new node_1.default(key, node, isWord);
            }
            else if (!item.word) {
                item.word = isWord;
            }
            children[key] = item;
            this.insertNode(item, word);
        }
    };
    /**
     * 创建Failure表
     */
    Tree.prototype.createFailureTable = function () {
        // 获取树第一层
        var currQueue = Object.values(this.root.children);
        while (currQueue.length > 0) {
            var nextQueue = [];
            for (var i = 0; i < currQueue.length; i++) {
                var node = currQueue[i];
                var key = node.key;
                var parent_1 = node.parent;
                node.failure = this.root;
                // 获取树下一层
                for (var k in node.children) {
                    nextQueue.push(node.children[k]);
                }
                if (parent_1) {
                    var failure = parent_1.failure;
                    while (failure) {
                        var children = failure.children[key];
                        // 判断是否到了根节点
                        if (children) {
                            node.failure = children;
                            break;
                        }
                        failure = failure.failure;
                    }
                }
            }
            currQueue = nextQueue;
        }
    };
    /**
     * 搜索节点
     * @param key
     * @param node
     */
    Tree.prototype.search = function (key, node) {
        if (node === void 0) { node = this.root.children; }
        return node[key];
    };
    return Tree;
}());
exports.default = Tree;
//# sourceMappingURL=tree.js.map