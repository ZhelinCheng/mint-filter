"use strict";
/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: tree
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("./node"));
class Tree {
    constructor() {
        this.root = {};
    }
    /**
     * 插入数据
     * @param key
     */
    insert(key) {
        if (!key)
            return false;
        if (key.length > 1) {
            this.insertNode(this.root, key.split(''));
        }
        else if (!this.root[key]) {
            this.root[key] = new node_1.default(key);
        }
        return true;
    }
    /**
     * 插入节点
     * @param node
     * @param word
     */
    insertNode(node, word) {
        let len = word.length;
        if (len) {
            let key = word.shift();
            if (!node[key]) {
                node[key] = new node_1.default(key, len === 1);
            }
            this.insertNode(node[key].children, word);
        }
    }
    /**
     * 搜索节点
     * @param key
     * @param node
     */
    search(key, node = this.root) {
        const val = node[key];
        if (val)
            return val;
        else
            return false;
    }
}
exports.default = Tree;
//# sourceMappingURL=tree.js.map