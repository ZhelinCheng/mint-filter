"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
const tree_1 = __importDefault(require("./core/tree"));
let instance = undefined;
class Mint extends tree_1.default {
    // 是否替换原文本敏感词
    constructor(keywords) {
        if (instance)
            return instance;
        super();
        if (!(keywords instanceof Array && keywords.length >= 1)) {
            console.error('mint-filter：未将过滤词数组传入！');
            return;
        }
        // 创建Trie树
        for (let item of keywords) {
            if (!item)
                continue;
            this.insert(item.toLocaleUpperCase());
        }
        this._createFailureTable();
        instance = this;
    }
    _filterFn(word, every = false, replace = true) {
        let startIndex = 0;
        let endIndex = startIndex;
        const wordLen = word.length;
        let originalWord = word;
        let filterKeywords = [];
        word = word.toLocaleUpperCase();
        // 保存过滤文本
        let filterText = '';
        // 是否通过，无敏感词
        let isPass = true;
        // 正在进行划词判断
        let isJudge = false;
        let judgeText = '';
        // 上一个Node与下一个Node
        let prevNode = this.root;
        let currNode;
        for (endIndex; endIndex <= wordLen; endIndex++) {
            let key = word[endIndex];
            let originalKey = originalWord[endIndex];
            currNode = this.search(key, prevNode.children);
            if (isJudge && currNode) {
                if (replace)
                    judgeText += originalKey;
                prevNode = currNode;
                continue;
            }
            else if (isJudge && prevNode.word) {
                isPass = false;
                if (every)
                    break;
                if (replace)
                    filterText += '*'.repeat(endIndex - startIndex);
                filterKeywords.push(word.slice(startIndex, endIndex));
            }
            else if (replace) {
                filterText += judgeText;
            }
            if (!currNode) {
                // 直接在分支上找不到，需要走failure
                let failure = prevNode.failure;
                while (failure) {
                    currNode = this.search(key, failure.children);
                    if (currNode)
                        break;
                    failure = failure.failure;
                }
            }
            if (currNode) {
                judgeText = originalKey;
                isJudge = true;
                prevNode = currNode;
            }
            else {
                judgeText = '';
                isJudge = false;
                prevNode = this.root;
                if (replace && key !== undefined)
                    filterText += originalKey;
            }
            startIndex = endIndex;
        }
        return {
            text: replace ? filterText : originalWord,
            filter: [...new Set(filterKeywords)],
            pass: isPass
        };
    }
    /**
     * 异步快速检测字符串是否无敏感词
     * @param word
     */
    every(word) {
        return Promise.resolve(this._filterFn(word, true).pass);
    }
    /**
     * 同步快速检测字符串是否无敏感词
     * @param word
     */
    everySync(word) {
        return this._filterFn(word, true).pass;
    }
    /**
     * 同步过滤方法
     * @param word
     * @param replace
     */
    filterSync(word, replace = true) {
        return this._filterFn(word, false, replace);
    }
    /**
     * 异步过滤方法
     * @param word
     * @param replace
     */
    filter(word, replace = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this._filterFn(word, false, replace));
        });
    }
}
if (require.main === module) {
    // ['bd', 'b'] 1bbd2 1bdb2 1bbdb2
    // ['bd', 'db'] 1bddb2
    let m = new Mint(['淘宝', '拼多多', '京东', 'TEST']);
    console.log(m.filterSync('双十一在淘宝买东西，618在京东买东西，当然你也可以在拼多多买东西。'));
    console.log(m.filterSync('这是另外的TEST字符串'));
    console.log(m.everySync('测试这条语句是否能通过，加上任意一个关键词京东'));
}
module.exports = Mint;
//# sourceMappingURL=index.js.map