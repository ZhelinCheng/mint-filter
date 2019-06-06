"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
const glob_1 = __importDefault(require("glob"));
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
    let files = glob_1.default.sync(selfPath);
    let results = '';
    for (let file of files) {
        results = `${results}\r\n${readFile(file)}`;
    }
    results = results.toLocaleUpperCase();
    return [...new Set(results.split(/\r\n|\n|\r/))];
}
exports.getAllKeywords = getAllKeywords;
//# sourceMappingURL=index.js.map