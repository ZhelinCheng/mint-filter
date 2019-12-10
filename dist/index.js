"use strict";
/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-12-02 15:35:20
 * @LastEditors: Zhelin Cheng
 * @Description: 主文件
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
        let filterTextArr = [];
        let keyword = [];
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
                // keywords += nextNode.key
                if (!isStart) {
                    isStart = true;
                    startIndex = endIndex;
                }
                if (nextNode.word) {
                    // console.log('==>', key, startIndex, endIndex)
                    const keywordLen = endIndex - startIndex + 1;
                    isStart = isPass = false;
                    keyword = filterTextArr.splice(startIndex, keywordLen, '*'.repeat(keywordLen));
                    filterKeywords.push(keyword.join(''));
                    nextNode = false;
                    if (every)
                        break;
                }
            }
            else if (isStart) {
                isStart = false;
                // 在失配路线上找到子元素
                searchNode = searchNode.failure;
                nextNode = this.search(key, searchNode.children);
                if (nextNode && searchNode.key !== 'root') {
                    startIndex = endIndex - 1;
                    isStart = isPass = true;
                    nextNode = searchNode;
                }
                else {
                    nextNode = false;
                }
                endIndex--;
            }
            else {
                isStart = false;
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
/* if (require.main === module) {
  let m = new Mint(['B', 'BA'])
  console.log(m.filterSync(`ABA`))
  // let m = new Mint(['多少', '少'])
  // console.log(m.filterSync(`多少少`))
} */
//# sourceMappingURL=index.js.map