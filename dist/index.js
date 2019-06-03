"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
const core_1 = require("./core");
class Mint {
    constructor(keywordsPath) {
        this.keywords = {};
        // 获取关键词数组
        let arr = core_1.getAllKeywords(keywordsPath);
        // 创建
        this.keywords = core_1.createTrieTree(arr);
    }
}
exports.default = Mint;
if (require.main === module) {
    // console.log(getAllKeywords())
    let m = new Mint();
    console.log(m.keywords);
}
//# sourceMappingURL=index.js.map