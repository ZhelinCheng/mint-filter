"use strict";
/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-12-02 14:12:18
 * @LastEditors: Zhelin Cheng
 * @Description: 主文件
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
class Mint extends core_1.Tree {
    // 是否替换原文本敏感词
    constructor(keywords) {
        super();
        if (!(keywords instanceof Array && keywords.length >= 1)) {
            throw Error('Mint：敏感词keywords应该是一个数组！');
        }
        // 创建Trie树
        for (let item of keywords) {
            if (!item)
                continue;
            item = item.toString();
            if (/[a-z]/i.test(item)) {
                // 有字母
                this.insert(item.toLocaleUpperCase());
            }
            else {
                this.insert(item);
            }
        }
        this.createFailureTable();
    }
    searchKey() {
    }
    filterFunc(word, every = false, replace = true) {
        let startIndex = 0;
        let endIndex = startIndex;
        const wordLen = word.length;
        let originalWord = word;
        let filterKeywords = [];
        word = word.toLocaleUpperCase();
        // 保存过滤文本
        let filterText = '';
        let filterTextArr = [];
        let keywords = '';
        // 是否通过，无敏感词
        let isPass = true;
        // 下一个Node与当前Node
        let searchNode = this.root;
        // let currNode: Node | boolean
        // 是否开始匹配
        let isStart = false;
        while (endIndex < wordLen) {
            let key = word[endIndex];
            let nextNode = this.search(key, searchNode.children);
            filterTextArr[endIndex] = key;
            // console.log(endIndex, key)
            // 判断是否找到
            if (nextNode) {
                // if (endIndex >= 17) console.log(isStart)
                if (!isStart) {
                    isStart = true;
                    startIndex = endIndex;
                }
                if (nextNode.word) {
                    // console.log('==>', key, startIndex, endIndex)
                    isStart = isPass = false;
                    keywords += key;
                    replace && filterTextArr.splice(startIndex, keywords.length, '*'.repeat(keywords.length));
                    filterKeywords.push(keywords);
                    if (every)
                        break;
                }
            }
            else if (isStart) {
                isStart = false;
                // 在失配路线上找到子元素
                searchNode = searchNode.failure;
                nextNode = this.search(key, searchNode.children);
                if (nextNode) {
                    startIndex = endIndex - 1;
                    isStart = isPass = true;
                    keywords = '';
                    nextNode = searchNode;
                }
                endIndex--;
            }
            else {
                isStart = false;
            }
            // 判断是否在进行匹配，将关键字拼接起来
            if (isStart) {
                keywords += key;
            }
            else {
                keywords = '';
            }
            searchNode = nextNode || searchNode.failure || this.root;
            endIndex++;
        }
        return {
            text: replace ? filterTextArr.join('') : originalWord,
            filter: [...new Set(filterKeywords)],
            pass: isPass
        };
    }
    /**
     * 异步快速检测字符串是否无敏感词
     * @param word
     */
    every(word) {
        return Promise.resolve(this.filterFunc(word, true).pass);
    }
    /**
     * 同步快速检测字符串是否无敏感词
     * @param word
     */
    validator(word) {
        return !this.filterFunc(word, true).pass;
    }
    everySync(word) {
        return this.filterFunc(word, true).pass;
    }
    /**
     * 同步过滤方法
     * @param word
     * @param replace
     */
    filterSync(word, replace = true) {
        return this.filterFunc(word, false, replace);
    }
    /**
     * 异步过滤方法
     * @param word
     * @param replace
     */
    filter(word, replace = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.filterFunc(word, false, replace));
        });
    }
}
exports.default = Mint;
if (require.main === module) {
    // let m = new Mint(['拼多多', '多少', '多多', '爆', '少多', 1111, 'abc'])
    // console.log(m.filterSync(`爆，这是简单的测试文字：这里的【京东京】是一段测试文字马上就要到双十一了，今年1111我屯了很多优惠券，有京东的，有淘宝的，也有拼多多的，但我最多的是京东优惠券。看来这个双十一我又要买很多东西了，毕竟多多益善。`))
    // console.log(m.filterSync(`0、爆，拼多多；1、拼多爆；2、拼多少；3、多少多；4、1111大促；5、智能ABC`))
}
//# sourceMappingURL=index.js.map