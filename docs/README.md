mint-filter / [Exports](modules.md)

基于Aho–Corasick算法，更轻巧的JavaScript敏感词过滤库🚀。支持Node.js、浏览器等环境（JavaScript/TypeScript），支持敏感词替换成*号。

![GitHub package.json version](https://img.shields.io/github/package-json/v/ZhelinCheng/mint-filter.svg)
[![npm version](https://img.shields.io/npm/v/mint-filter.svg?style=flat-square)](https://www.npmjs.com/package/mint-filter)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D3.0-green.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D7.6.0-green.svg)](https://nodejs.org/en/)
[![License](https://img.shields.io/github/license/ZhelinCheng/mint-filter.svg)](https://github.com/ZhelinCheng/mint-filter/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/mint-filter.svg)](https://www.npmjs.com/package/mint-filter)
[![Coverage Status](https://coveralls.io/repos/github/ZhelinCheng/mint-filter/badge.svg?branch=master)](https://coveralls.io/github/ZhelinCheng/mint-filter?branch=master)
![CI](https://github.com/ZhelinCheng/mint-filter/workflows/CI/badge.svg)

## 💪 支持平台

本插件支持Node及浏览器平台，因为使用了Set等新特性，在浏览器上需要Babel的支持！

## 🎇 说明

基于Aho–Corasick算法实现的敏感词过滤方案，Aho–Corasick算法是由Alfred V. Aho和Margaret J.Corasick 发明的字符串搜索算法，用于在输入的一串字符串中匹配有限组“字典”中的子串。它与普通字符串匹配的不同点在于同时与所有字典串进行匹配。算法均摊情况下具有近似于线性的时间复杂度，约为字符串的长度加所有匹配的数量。

实现详细说明（搜索算法未更新，请查看代码）：

个人博客：[《TypeScript：Aho–Corasick算法实现敏感词过滤》](https://zhelin.me/post/47627553bd09576fbdeafc11dc93bfbf/)

掘金社区：[《TypeScript：Aho–Corasick算法实现敏感词过滤》](https://juejin.im/post/5cfa6bb6f265da1b8a4f0ed8)

### 性能

使用20000个随机敏感词实例化的平均时间：< 96ms

测试字符串包含随机生成的汉字、字母、数字。
以下测试均在20000个随机敏感词构建的树下进行测试，每组测试6次取平均值：

| 编号         | 字符串长度        |  不替换敏感词[replace:false]  | 替换敏感词 |
| :--------:   | :-----:          | :----:        | :----:    |
| 1            | 1000             |   < 1.35ms     | < 1.55ms   |
| 2            | 5000             |   < 3.60ms     | < 3.60ms   |
| 3            | 10000            |   < 8.10ms     | < 9.81ms   |
| 4            | 20000            |   < 15.03ms    | < 16.03ms  |
| 5            | 50000            |   < 20.83ms    | < 21.18ms  |
| 6            | 100000           |   < 29.02ms    | < 34.45ms  |

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

### TypeScript / ES Module引用

```typescript
import Mint from 'mint-filter'
const mint = new Mint(['敏感词数组'])

// 基本使用
mint.filter('需要验证的文本')
```

### 方法

## 📚开发

开发：

```shell
npm run dev
```

构建：

```shell
npm run build
```
