/*!
 * mint-filter 3.1.0 (https://github.com/ZhelinCheng/mint-filter)
 * API https://github.com/ZhelinCheng/mint-filter/blob/master/doc/api.md
 * Copyright 2019-2020 Zhelin Cheng. All Rights Reserved
 * Licensed under MIT (https://github.com/ZhelinCheng/mint-filter/blob/master/LICENSE)
 */

'use strict';

/*
 * @Author: Zhelin Cheng
 * @Date: 2020-03-27 15:14:57
 * @LastEditTime: 2020-03-27 15:26:45
 * @LastEditors: Zhelin Cheng
 * @Description:
 */
var test1 = { a: 1, b: 3 };
var test2 = Object.assign({}, test1);
var test3 = new Set([1, 3, 4]);
console.log(test2, test3);
