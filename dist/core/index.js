"use strict";
/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * 读取文件内容
 * @param path {string} 文件路径
 */
function readFile(path) {
    return fs_1.default.readFileSync(path).toString().trim();
}
exports.readFile = readFile;
/**
 * 获取所有敏感词
 */
function getAllKeywords(selfPath) {
    if (selfPath) {
        let str = readFile(selfPath);
        return [...new Set(str.split(/\r\n|\n|\r/))];
    }
    else {
        let files = glob_1.default.sync(path_1.default.resolve(__dirname, '../../keywords/*.txt'));
        let results = '';
        for (let file of files) {
            results = `${results}\r\n${readFile(file)}`;
        }
        return [...new Set(results.split(/\r\n|\n|\r/))];
    }
}
exports.getAllKeywords = getAllKeywords;
/**
 * 创建Trie树
 * @param keywords
 */
function createTrieTree(keywords) {
    let trie = {
        root: true,
        children: {}
    };
    for (let item of keywords) {
        for (let str of item.split('')) {
            // trie[str]
        }
    }
    return {};
}
exports.createTrieTree = createTrieTree;
//# sourceMappingURL=index.js.map