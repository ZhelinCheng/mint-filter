"use strict";
/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-11-29 17:59:47
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
const core_1 = require("./core");
class Mint extends core_1.Tree {
    // 是否替换原文本敏感词
    constructor(keywords) {
        super();
        if (!(keywords instanceof Array && keywords.length >= 1)) {
            console.error('mint-filter：未将过滤词数组传入！');
            return;
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
            let currNode = this.search(key, searchNode.children);
            filterTextArr[endIndex] = key;
            // 判断是否找到
            if (currNode) {
                if (!isStart) {
                    startIndex = endIndex;
                    isStart = true;
                    keywords = '';
                }
                // 是否匹配成功
                if (isStart && currNode.word) {
                    isStart = isPass = false;
                    keywords += key;
                    // console.log(startIndex, endIndex, key)
                    replace && filterTextArr.splice(startIndex, keywords.length, '*'.repeat(keywords.length));
                    filterKeywords.push(keywords);
                }
            }
            else if (isStart) {
                // 如果没有匹配到，走失配流程
                const saveKey = key;
                currNode = searchNode.failure;
                key = currNode.key;
                isStart = false;
                keywords = '';
                if (key !== 'root') {
                    startIndex = endIndex - 1;
                    isStart = true;
                }
                else {
                    currNode = this.search(saveKey, this.root.children);
                    if (currNode) {
                        startIndex = endIndex;
                        isStart = true;
                        key = saveKey;
                    }
                }
                // 是否匹配成功
                if (currNode && currNode.word) {
                    // console.log(startIndex, endIndex - 1, key)
                    isStart = isPass = false;
                    keywords += key;
                    filterKeywords.push(keywords);
                    replace && filterTextArr.splice(startIndex, keywords.length, '*'.repeat(keywords.length));
                    endIndex -= 2;
                }
            }
            if (isStart)
                keywords += key;
            searchNode = currNode || this.root;
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
    includes(word) {
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
if (require.main === module) {
    let m = new Mint(['京东', '东京', '淘宝', '拼多多', '双十一', 1111, '优惠券', '京东优惠券', '多多']);
    console.log(m.filterSync(`
  这是简单的测试文字：
  这里的【京东京】是一段测试文字
  马上就要到双十一了，今年1111我屯了很多优惠券，
  有京东的，有淘宝的，也有拼多多的，
  但我最多的是京东优惠券。
  看来这个双十一我又要买很多东西了，毕竟多多益善。
  `));
}
module.exports = Mint;
//# sourceMappingURL=index.js.map