# Mint-filter
🚀基于Aho–Corasick算法，更轻巧的Node.js敏感词过滤库。

![GitHub package.json version](https://img.shields.io/github/package-json/v/ZhelinCheng/mint-filter.svg)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D3.0-green.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D7.6.0-green.svg)](https://nodejs.org/en/)
[![License](https://img.shields.io/github/license/ZhelinCheng/mint-filter.svg)](https://github.com/ZhelinCheng/mint-filter/blob/master/LICENSE)
![npm](https://img.shields.io/npm/dw/mint-filter.svg)
[![Coverage Status](https://coveralls.io/repos/github/ZhelinCheng/mint-filter/badge.svg?branch=master)](https://coveralls.io/github/ZhelinCheng/mint-filter?branch=master)

## 说明
基于Aho–Corasick算法实现的敏感词过滤方案，Aho–Corasick算法是由Alfred V. Aho和Margaret J.Corasick 发明的字符串搜索算法，用于在输入的一串字符串中匹配有限组“字典”中的子串。它与普通字符串匹配的不同点在于同时与所有字典串进行匹配。算法均摊情况下具有近似于线性的时间复杂度，约为字符串的长度加所有匹配的数量。

### 测试数据

每组字符串长度均测试查找3个敏感词。字符串包含汉字、标点、字母、数字（字符串实际长度会大于表格显示长度）。

| 编号        | 字符串长度    |  时间  |
| --------   | -----:   | :----: |
| 1        | <= 100      |   <= 1ms    |
| 2        | 5000      |   <= 5ms    |
| 3        | 10000      |   <= 9ms    |
| 4        | 20000      |   <= 13ms    |
| 5        | 50000      |   <= 20ms    |

## 安装
```
npm i -S mint-filter
```
或
```
yarn add mint-filter
```

## 使用

### NodeJS
```javascript
// 包提供了一个获取敏感词文件的方法getAllKeywords('path')
// 该方法将返回一个敏感词数组，支持正则匹配
// const { getAllKeywords } = require('./node_modules/mint-filter/dist/core')

const Mint = require('mint-filter')
const mint = new Mint(['敏感词数组'])

// 异步方法，该方法返回的是一个Promise对象
mint.filter('word')

// 同步方法
mint.filterSync('word')
```

### TypeScript
```typescript
// 包提供了一个获取敏感词文件的方法getAllKeywords('path')
// 该方法将返回一个敏感词数组，支持正则匹配
// import { getAllKeywords } from ('./node_modules/mint-filter/dist/core')

import Mint from 'mint-filter'
const mint = new Mint(['敏感词数组'])

// 异步方法，该方法返回的是一个Promise对象
mint.filter('word')

// 同步方法
mint.filterSync('word')
```

### 方法

所有方法都提供同步/异步两种。英文字母会全部转换成大写比较。

#### filter(word)
- `word`<[string]> 需要过滤的字符串。
- returns: <[Promise]<[FilterValue]>>

该方法将返回过滤文本和被过滤的敏感词。

```typescript
import Mint from 'mint-filter'
const mint = new Mint(['敏感词'])

mint.filter('这是一个敏感词字符串')
    .then(data => {
      console.log(data) // { text: '这是一个***字符串', filter: [ '敏感词' ], pass: false }
    })
```

#### filterSync(word)
- `word`<[string]> filter的同步方法。
- returns: <[FilterValue]>

#### every(word)
- `word`: 需要验证的字符串文本。
- returns: <[Promise]<[boolean]>>

判断文本是否通过敏感词验证，发现敏感词立即返回`false`，为`true`表示通过验证，没有敏感词。该方法是一个异步方法，将会返回一个Promise对象。

```typescript
import Mint from 'mint-filter'
const mint = new Mint(['敏感词'])

mint.every('这是一个敏感词字符串')
    .then(data => {
      console.log(data) // true
    })
```

#### everySync(word)
- `word`: 需要验证的字符串文本。
- returns: <[boolean]>
