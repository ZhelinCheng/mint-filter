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
        let keyArr = key.split('');
        let firstKey = keyArr.shift();
        // 第一个key
        if (!this.root[firstKey]) {
            this.root[firstKey] = new node_1.default(firstKey);
        }
        // 其他多余的key
        if (keyArr.length >= 1) {
            this.insertNode(this.root[firstKey], keyArr);
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
            let children;
            children = node.children;
            const key = word.shift();
            let item = children[key];
            const isWord = len === 1;
            if (!item) {
                // let failure = this.createFailureTable(node, key)
                item = new node_1.default(key, node, isWord);
            }
            else {
                item.word = isWord;
            }
            children[key] = item;
            this.insertNode(children[key], word);
        }
    }
    /**
     * 创建Failure表
     */
    createFailureTable(node, key) {
        let fail = node.failure;
        let isNode = fail instanceof node_1.default;
        let children = fail.children;
        // fail是否是Node类型，如果不是则指向了根
        if (isNode) {
            if (children[key]) {
                return fail;
            }
            this.createFailureTable(fail, key);
        }
        else {
            if (fail[key]) {
                return fail[key];
            }
            console.log(11);
        }
        return this.root;
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