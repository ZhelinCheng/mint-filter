"use strict";
/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-06 18:16:00
 * @LastEditors: Zhelin Cheng
 * @Description: 主文件
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var English;
(function (English) {
    English["NONE"] = "none";
    English["CAPITAL"] = "capital";
    English["LOWER"] = "lower";
})(English || (English = {}));
var Mint = /** @class */ (function (_super) {
    __extends(Mint, _super);
    // 是否替换原文本敏感词
    function Mint(keywords, options) {
        if (keywords === void 0) { keywords = []; }
        if (options === void 0) { options = { transform: English.NONE }; }
        var _this = _super.call(this) || this;
        _this.options = { transform: English.NONE };
        var transform = options.transform;
        // 创建Trie树
        for (var _i = 0, keywords_1 = keywords; _i < keywords_1.length; _i++) {
            var item = keywords_1[_i];
            if (!item)
                continue;
            item = item.toString();
            if (transform === English.NONE) {
                _this.insert(item);
                continue;
            }
            if (/[a-z]/i.test(item)) {
                // 有字母
                item = transform === English.CAPITAL ? item.toLocaleUpperCase() : item.toLocaleLowerCase();
                _this.insert(item);
            }
            else {
                _this.insert(item);
            }
        }
        _this.options = options;
        _this.createFailureTable();
        return _this;
    }
    Mint.prototype.searchKey = function () {
    };
    // TODO: 该方法整体得修改
    Mint.prototype.filterFunc = function (word, every, replace) {
        if (every === void 0) { every = false; }
        if (replace === void 0) { replace = true; }
        var startIndex = 0;
        var endIndex = startIndex;
        var wordLen = word.length;
        var originalWord = word;
        var filterKeywords = [];
        // 字母是否需要转换判断
        var transform = this.options.transform;
        if (transform !== English.NONE) {
            word = transform === English.CAPITAL ? word.toLocaleUpperCase() : word.toLocaleLowerCase();
        }
        // 保存过滤文本
        var filterTextArr = [];
        var keyword = [];
        // 是否通过，无敏感词
        var isPass = true;
        // 下一个Node与当前Node
        var searchNode = this.root;
        // let currNode: Node | boolean
        // 是否开始匹配
        var isStart = false;
        while (endIndex < wordLen) {
            var key = word[endIndex];
            var nextNode = this.search(key, searchNode.children);
            filterTextArr[endIndex] = key;
            // 判断是否找到
            if (nextNode) {
                // keywords += nextNode.key
                if (!isStart) {
                    isStart = true;
                    startIndex = endIndex;
                }
                if (nextNode.word) {
                    // console.log('==>', key, startIndex, endIndex)
                    var keywordLen = endIndex - startIndex + 1;
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
                else if (!nextNode && searchNode.word) {
                    endIndex--;
                    nextNode = false;
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
            filter: Array.from(new Set(filterKeywords)),
            pass: isPass
        };
    };
    /**
     * 异步快速检测字符串是否无敏感词
     * @param word
     */
    Mint.prototype.every = function (word) {
        return Promise.resolve(this.filterFunc(word, true).pass);
    };
    /**
     * 同步快速检测字符串是否无敏感词
     * @param word
     */
    Mint.prototype.validator = function (word) {
        return !this.filterFunc(word, true).pass;
    };
    Mint.prototype.everySync = function (word) {
        return this.filterFunc(word, true).pass;
    };
    /**
     * 同步过滤方法
     * @param word
     * @param replace
     */
    Mint.prototype.filterSync = function (word, replace) {
        if (replace === void 0) { replace = true; }
        return this.filterFunc(word, false, replace);
    };
    /**
     * 异步过滤方法
     * @param word
     * @param replace
     */
    Mint.prototype.filter = function (word, replace) {
        if (replace === void 0) { replace = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(this.filterFunc(word, false, replace))];
            });
        });
    };
    return Mint;
}(core_1.Tree));
exports.default = Mint;
// if (require.main === module) {
//   let m = new Mint(['操', '我操你'])
//   console.log(m.filterSync(`我操呀`))
//   // console.log(m.root.children['我'].children['操'])
//   // let m = new Mint(['多少', '少'])
//   // console.log(m.filterSync(`多少少`))
// }
//# sourceMappingURL=index.js.map