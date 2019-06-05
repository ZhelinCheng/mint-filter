# Mint-filter
🚀更轻巧的Node.js敏感词过滤库。

![GitHub package.json version](https://img.shields.io/github/package-json/v/ZhelinCheng/mint-filter.svg)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D3.0-green.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D7.6.0-green.svg)](https://nodejs.org/en/)
![GitHub](https://img.shields.io/github/license/ZhelinCheng/mint-filter.svg)
[![Coverage Status](https://coveralls.io/repos/github/ZhelinCheng/mint-filter/badge.svg?branch=master)](https://coveralls.io/github/ZhelinCheng/mint-filter?branch=master)

## 说明
基于Trie树实现的敏感词过滤方案，Trie树也称为字典树、单词查找树，其最大的特点就是共享字符串的公共前缀来达到节省空间的目的。从而实现更加快速、轻巧的查找，测试20字以内1-2ms，5000字8ms。

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
const Mint = require('mint-filter')

// 实例化的时候可以传递自定义敏感词路径
const mint = new Mint("敏感词文件路径，可不填")

// 异步方法，该方法返回的是一个Promise对象
mint.filter('word')

// 同步方法
mint.filterSync('word')
```

### TypeScript
```typescript
// 实例化的时候可以传递自定义敏感词路径

import Mint from 'mint-filter'
const mint = new Mint("敏感词文件路径，可不填")

// 异步方法，该方法返回的是一个Promise对象
mint.filter('word')

// 同步方法
mint.filterSync('word')
```

#### 方法

- `.filter(word: string): Promise<FilterValue>`：该方法是一个异步方法，将会返回一个Promise对象。
- `.filterSync(word: string): FilterValue`：filter的同步方法。

#### 返回内容
```json
{
  "text": "替换后的文本***",
  "filter": ["被过滤的词"]
}
```