# Mint-filter
🚀更轻巧的Node.js敏感词过滤库。

## 安装
```
npm i -S mint-filter
```
或
```
yarn add mint-filter
```

## 使用

### Node
```ecmascript 6
const Mint = require('mint-filter')

// 实例化的时候可以传递自定义敏感词路径
const mint = new Mint()

// 异步方法，该方法返回的是一个Promise对象
mint.filter('word')

// 同步方法
mint.filterSync('word')
```


### TypeScript
```typescript
// 实例化的时候可以传递自定义敏感词路径

import Mint from 'mint-filter'
const mint = new Mint()

// 异步方法，该方法返回的是一个Promise对象
mint.filter('word')

// 同步方法
mint.filterSync('word')
```