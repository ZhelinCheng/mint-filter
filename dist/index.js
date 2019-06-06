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
function replaceAt(word, start, end) {
    let len = end - start;
    return `${word.substring(0, start)}${'*'.repeat(len)}${word.substring(end)}`;
}
class Mint extends tree_1.default {
    constructor(keywords) {
        if (instance)
            return instance;
        super();
        // 创建Trie树
        // let keywords: Array<string> = getAllKeywords(keywordsPath)
        if (!(keywords instanceof Array)) {
            throw Error('实例参数必须是一个数组');
        }
        for (let item of keywords) {
            if (!item)
                continue;
            this.insert(item);
        }
        this._createFailureTable();
        instance = this;
    }
    _filterFn(word, every) {
        let startIndex = 0;
        let endIndex = startIndex;
        const wordLen = word.length;
        let filterText = word;
        let filterKeywords = [];
        word = word.toLocaleUpperCase();
        // 是否通过，无敏感词
        let isPass = true;
        // 正在进行划词判断
        let isJudge = false;
        let currNode = this.root;
        let nextNode;
        for (endIndex; endIndex <= wordLen; endIndex++) {
            let key = word[endIndex];
            // if (!key) continue
            nextNode = this.search(key, currNode.children);
            if (isJudge && nextNode) {
                currNode = nextNode;
                continue;
            }
            if (!nextNode) {
                // 直接在分支上找不到，需要走failure
                let failure = currNode.failure;
                while (failure) {
                    nextNode = this.search(key, failure.children);
                    if (nextNode) {
                        break;
                    }
                    failure = failure.failure;
                }
            }
            if (nextNode) {
                currNode = nextNode;
                isJudge = true;
            }
            else {
                if (startIndex !== endIndex && currNode.word) {
                    filterText = replaceAt(filterText, startIndex, endIndex);
                    filterKeywords.push(word.slice(startIndex, endIndex));
                    isPass = false;
                    if (every)
                        break;
                }
                isJudge = false;
                currNode = this.root;
            }
            startIndex = endIndex;
        }
        return {
            text: filterText,
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
     */
    filterSync(word) {
        return this._filterFn(word);
    }
    /**
     * 异步过滤方法
     * @param word
     */
    filter(word) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this._filterFn(word));
        });
    }
}
if (require.main === module) {
    let m = new Mint(['TEST']);
    console.log(m.everySync('TEST'));
}
module.exports = Mint;
//# sourceMappingURL=index.js.map