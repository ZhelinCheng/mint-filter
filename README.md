#

> 请升级至2.0.0+，低版本存在一种无法判断的情况。

🚀基于Aho–Corasick算法，更轻巧的Node.js敏感词过滤库。

![GitHub package.json version](https://img.shields.io/github/package-json/v/ZhelinCheng/mint-filter.svg)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D3.0-green.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D7.6.0-green.svg)](https://nodejs.org/en/)
[![License](https://img.shields.io/github/license/ZhelinCheng/mint-filter.svg)](https://github.com/ZhelinCheng/mint-filter/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/mint-filter.svg)](https://www.npmjs.com/package/mint-filter)
![npm version](https://img.shields.io/npm/v/mint-filter.svg?style=flat-square)
[![Coverage Status](https://coveralls.io/repos/github/ZhelinCheng/mint-filter/badge.svg?branch=master)](https://coveralls.io/github/ZhelinCheng/mint-filter?branch=master)

## 🎇 说明

基于Aho–Corasick算法实现的敏感词过滤方案，Aho–Corasick算法是由Alfred V. Aho和Margaret J.Corasick 发明的字符串搜索算法，用于在输入的一串字符串中匹配有限组“字典”中的子串。它与普通字符串匹配的不同点在于同时与所有字典串进行匹配。算法均摊情况下具有近似于线性的时间复杂度，约为字符串的长度加所有匹配的数量。

实现详细说明：

个人博客：[《TypeScript：Aho–Corasick算法实现敏感词过滤》](https://zhelin.me/post/47627553bd09576fbdeafc11dc93bfbf/)

掘金社区：[《TypeScript：Aho–Corasick算法实现敏感词过滤》](https://juejin.im/post/5cfa6bb6f265da1b8a4f0ed8)

### 性能

*该性能测试，使用的插件版本小于2.0.0*

使用20000个随机敏感词实例化的平均时间：< 96ms

测试字符串包含随机生成的汉字、字母、数字。
以下测试均在20000个随机敏感词构建的树下进行测试，每组测试6次取平均值：

| 编号         | 字符串长度        |  不替换敏感词  | 替换敏感词 |
| :--------:   | :-----:          | :----:        | :----:    |
| 1            | 1000             |   0.987ms     | 1.088ms   |
| 2            | 5000             |   3.095ms     | 3.252ms   |
| 3            | 10000            |   9.133ms     | 9.881ms   |
| 4            | 20000            |   10.569ms    | 12.032ms  |
| 5            | 50000            |   15.741ms    | 23.606ms  |
| 6            | 100000           |   31.072ms    | 46.681ms  |

需要注意的是，实际生产环境运行速度会比上面测试数据更快。

## 📦 安装

```javascript
npm i -S mint-filter
```

或

```javascript
yarn add mint-filter
```

## 🎉 使用

### NodeJS

```javascript
// Mint导出是 export default Mint
// 所以在使用require引用的时，Mint可能挂载在default下面
const Mint = require('mint-filter')
const mint = new Mint(['敏感词数组'])

// 异步方法，该方法返回的是一个Promise对象
mint.filter('word').then((res) => {})

// 同步方法
mint.filterSync('word')
```

### TypeScript

```typescript
import Mint from 'mint-filter'
const mint = new Mint(['敏感词数组'])

// 异步方法，该方法返回的是一个Promise对象
mint.filter('word').then((res) => {})

// 同步方法
mint.filterSync('word')
```

### 特殊匹配

有一种特殊情况，如`['AB', 'BA']`匹配`ABA`，在这种情况下，`ABA`可以划分成AB和BA两种情况，这里只匹配前部，最终结果会变成`**A`。

### 方法

所有方法都提供同步/异步两种。英文字母会全部转换成大写比较。

#### filter(word， replace)

- `word`<[string]>：需要过滤的字符串。
- `replace`<[boolean]>：是否需要替换敏感词（替换成*，默认开启）。
- returns: <[Promise]<[FilterValue]>>

该方法将返回过滤文本和被过滤的敏感词。

```typescript
import Mint from 'mint-filter'
const mint = new Mint(['敏感词'])

mint.filter('这是一个敏感词字符串')
    .then(data => {
      console.log(data) // { text: '这是一个***字符串', filter: [ '敏感词' ], pass: false }
    })

mint.filter('这是一个敏感词字符串', false)
    .then(data => {
      console.log(data) // { text: '这是一个敏感词字符串', filter: [ '敏感词' ], pass: false }
    })
```

#### filterSync(word， replace)

- `word`<[string]>：filter的同步方法。
- `replace`<[boolean]>：是否需要替换敏感词（替换成*，默认开启）。
- returns: <[FilterValue]>

<!-- #### every(word)

- `word`<[string]>：需要验证的字符串文本。
- returns: <[Promise]<[boolean]>>

判断文本是否通过敏感词验证，发现敏感词立即返回`false`，为`true`表示通过验证，没有敏感词。该方法是一个异步方法，将会返回一个Promise对象。

```typescript
import Mint from 'mint-filter'
const mint = new Mint(['敏感词'])

mint.every('这是一个敏感词字符串')
    .then(data => {
      console.log(data) // true
    })
``` -->

#### validator(word)

- `word`<[string]>：需要验证的字符串文本。
- returns: <[boolean]>

判断文本是否通过敏感词验证，发现一个敏感词会立即返回`true`。
