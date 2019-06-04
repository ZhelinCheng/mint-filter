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
const core_1 = require("./core");
const tree_1 = __importDefault(require("./core/tree"));
const node_1 = __importDefault(require("./core/node"));
let instance = undefined;
function replaceAt(word, start, end) {
    let len = end - start + 1;
    return `${word.substring(0, start)}${'*'.repeat(len)}${word.substring(end + 1)}`;
}
class Mint extends tree_1.default {
    constructor(keywordsPath) {
        if (instance)
            return instance;
        super();
        // 创建Trie树
        let keywords = core_1.getAllKeywords(keywordsPath);
        for (let item of keywords) {
            if (!item)
                continue;
            this.insert(item);
        }
        instance = this;
    }
    _filterFn(word) {
        let startIndex = 0;
        let endIndex = startIndex;
        const wordLen = word.length + 1;
        // 正在进行划词判断
        let isJudge = false;
        let node = false;
        let prevNode;
        let filterText = word;
        let filterKeywords = [];
        word = word.toLocaleUpperCase();
        for (let i = 0; i < wordLen; i++) {
            if (node instanceof node_1.default) {
                prevNode = node;
                node = this.search(word[i], node.children);
            }
            else {
                node = this.search(word[i]);
            }
            // 正在划词判断且当前字也属于敏感字
            if (isJudge && node) {
                endIndex = i;
                continue;
            }
            if (node) {
                startIndex = i;
                isJudge = true;
            }
            else {
                if (startIndex !== endIndex && prevNode.word) {
                    filterText = replaceAt(filterText, startIndex, endIndex);
                    filterKeywords.push(word.slice(startIndex, endIndex + 1));
                }
                startIndex = endIndex = i;
                isJudge = false;
            }
        }
        return {
            text: filterText,
            filter: filterKeywords
        };
    }
    // 过滤同步
    filterSync(word) {
        return this._filterFn(word);
    }
    // 过滤
    filter(word) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this._filterFn(word));
        });
    }
}
if (require.main === module) {
    (function f() {
        return __awaiter(this, void 0, void 0, function* () {
            let m = new Mint();
            console.log(m.filterSync('测试'));
        });
    }());
}
module.exports = Mint;
//# sourceMappingURL=index.js.map