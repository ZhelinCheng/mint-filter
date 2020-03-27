/*!
 * mint-filter 3.1.0 (https://github.com/ZhelinCheng/mint-filter)
 * API https://github.com/ZhelinCheng/mint-filter/blob/master/doc/api.md
 * Copyright 2019-2020 Zhelin Cheng. All Rights Reserved
 * Licensed under MIT (https://github.com/ZhelinCheng/mint-filter/blob/master/LICENSE)
 */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-08 15:09:46
 * @LastEditors: Zhelin Cheng
 * @Description: Node
 */
var Node = /** @class */ (function () {
    function Node(key, options) {
        if (options === void 0) { options = {}; }
        // 子节点的引用（goto表）
        this.children = {};
        // failure表，用于匹配失败后的跳转
        this.failure = undefined;
        // 字符深度
        this.depth = 0;
        var parent = options.parent, word = options.word, depth = options.depth;
        this.key = key;
        this.parent = parent;
        this.word = word || false;
        this.depth = typeof depth === 'number' ? depth : 1;
    }
    return Node;
}());

/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-27 11:48:52
 * @LastEditors: Zhelin Cheng
 * @Description: Tree
 */
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = new Node('root', {
            depth: 0
        });
    }
    /**
     * 插入数据
     * @param key
     */
    Tree.prototype.insert = function (key) {
        if (!key)
            return false;
        var keyArr = key.split('').reverse();
        var firstKey = keyArr.pop();
        var children = this.root.children;
        var len = keyArr.length;
        var firstNode = children[firstKey];
        // 第一个key
        if (!firstNode) {
            children[firstKey] = len
                ? new Node(firstKey)
                : new Node(firstKey, {
                    word: true
                });
        }
        else if (!len) {
            firstNode.word = true;
        }
        // 其他多余的key
        if (len >= 1) {
            this.insertNode(children[firstKey], keyArr, len + 1);
        }
        return true;
    };
    /**
     * 插入节点
     * @param node
     * @param word
     */
    Tree.prototype.insertNode = function (node, word, starLen) {
        var len = word.length;
        if (len) {
            var children = node.children;
            var key = word.pop();
            var item = children[key];
            var isWord = len === 1;
            if (!item) {
                item = new Node(key, {
                    parent: node,
                    word: isWord,
                    depth: starLen - len + 1
                });
            }
            else if (!item.word) {
                item.word = isWord;
            }
            children[key] = item;
            this.insertNode(item, word, starLen);
        }
    };
    /**
     * 创建Failure表
     */
    Tree.prototype.createFailureTable = function () {
        // 获取树第一层
        var currQueue = Object.values(this.root.children);
        while (currQueue.length > 0) {
            var nextQueue = [];
            for (var i = 0; i < currQueue.length; i++) {
                var node = currQueue[i];
                var key = node.key;
                var parent_1 = node.parent;
                node.failure = this.root;
                // 获取树下一层
                for (var k in node.children) {
                    nextQueue.push(node.children[k]);
                }
                if (parent_1) {
                    var failure = parent_1.failure;
                    while (failure) {
                        var children = failure.children[key];
                        // 判断是否到了根节点
                        if (children) {
                            node.failure = children;
                            break;
                        }
                        failure = failure.failure;
                    }
                }
            }
            currQueue = nextQueue;
        }
    };
    /**
     * 搜索节点
     * @param key
     * @param node
     */
    Tree.prototype.search = function (key, node) {
        if (node === void 0) { node = this.root.children; }
        return node[key];
    };
    return Tree;
}());

/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-27 11:27:14
 * @LastEditors: Zhelin Cheng
 * @Description: 主文件
 */
var English;
(function (English) {
    English["NONE"] = "none";
    English["CAPITAL"] = "capital";
    English["LOWER"] = "lower";
})(English || (English = {}));
var Mint = /** @class */ (function (_super) {
    __extends(Mint, _super);
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
    /**
     * 收集敏感词
     * @param node 节点
     */
    Mint.prototype.collectWord = function (node) {
        var arr = [];
        do {
            arr.push(node.key);
            node = node.parent;
        } while (node);
        return arr.reverse().join('');
    };
    /**
     * 筛选方法
     * @param word 文字
     * @param every 验证全部
     * @param replace 是否替换
     */
    Mint.prototype.filterFunc = function (text, options) {
        if (options === void 0) { options = {}; }
        var _a = options.replace, replace = _a === void 0 ? true : _a, _b = options.every, every = _b === void 0 ? true : _b, _c = options.words, words = _c === void 0 ? true : _c;
        // 字符大小写转换
        var transform = this.options.transform;
        if (transform !== English.NONE) {
            text = transform === English.CAPITAL ? text.toLocaleUpperCase() : text.toLocaleLowerCase();
        }
        // 字符长度
        var wordLen = text.length;
        if (wordLen <= 0) {
            return {
                text: text,
                wrods: [],
                pass: true
            };
        }
        // 过滤后的文字
        var filterText = '';
        var filterWords = new Set([]);
        // 当前树位置
        var currNode = this.root;
        var nextNode;
        // 失配路线
        var failure;
        // 是否通过验证
        var isPass = true;
        for (var endIndex = 0; endIndex < wordLen; endIndex++) {
            var key = text[endIndex];
            filterText += key;
            nextNode = this.search(key, currNode.children);
            if (!nextNode) {
                failure = currNode.failure;
                while (failure) {
                    nextNode = this.search(key, failure.children);
                    if (nextNode)
                        break;
                    failure = failure.failure;
                }
            }
            if (nextNode) {
                failure = nextNode;
                do {
                    if (failure.word) {
                        isPass = false;
                        var len = failure.depth;
                        if (replace) {
                            filterText = filterText.slice(0, -len) + '*'.repeat(len);
                        }
                        if (words) {
                            filterWords.add(this.collectWord(failure));
                        }
                    }
                    failure = failure.failure;
                } while (failure.key !== 'root');
                currNode = nextNode;
                if (every || isPass) {
                    continue;
                }
                else {
                    break;
                }
            }
            currNode = this.root;
        }
        return {
            text: filterText,
            wrods: Array.from(filterWords),
            pass: isPass
        };
    };
    /**
     * 快速验证是否存在敏感词
     * @param text 文本
     */
    Mint.prototype.validator = function (text) {
        return this.filterFunc(text, {
            replace: false,
            every: false,
            words: false
        }).pass;
    };
    /**
     * 过滤方法
     * @param text 文本
     * @param options 选项
     */
    Mint.prototype.filterSync = function (text, options) {
        return this.filterFunc(text, options);
    };
    /**
     * 异步过滤方法
     * @param text 文本
     * @param options 选项
     */
    Mint.prototype.filter = function (text, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(this.filterFunc(text, options))];
            });
        });
    };
    return Mint;
}(Tree));
/* if (require.main === module) {
  let m = new Mint(['拼', '拼多多', '多少', '多多', '爆', '少多', 1111, 'ABC', '操', '我操你'])
  console.log(m.validator('哈哈哈哈111操'))
  // console.log(m.root.children['我'].children['操'])
  // let m = new Mint(['多少', '少'])
  // console.log(m.filterSync(`多少少`))
}
 */

export default Mint;
