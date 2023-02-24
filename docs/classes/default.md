# Class: Mint

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [root](default.md#root)

### Methods

- [add](default.md#add)
- [build](default.md#build)
- [delete](default.md#delete)
- [filter](default.md#filter)
- [pop](default.md#pop)
- [put](default.md#put)
- [search](default.md#search)
- [verify](default.md#verify)

## Constructors

### constructor

• **new Mint**(`keys`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Defined in

[index.ts:26](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L26)

## Properties

### root

• **root**: `default`

#### Defined in

[index.ts:24](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L24)

## Methods

### add

▸ **add**(`key`, `build?`): `boolean`

新增敏感词

**`Example`**

```typescript
const status = mint.add('敏感词')
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | 关键词 |
| `build` | `boolean` | `true` | 是否构建树，默认不用传递 |

#### Returns

`boolean`

状态

#### Defined in

[index.ts:233](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L233)

___

### build

▸ `Private` **build**(): `void`

#### Returns

`void`

#### Defined in

[index.ts:36](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L36)

___

### delete

▸ **delete**(`key`): ``"update"`` \| ``"delete"``

删除关键字

**`Example`**

```typescript
const status = mint.delete('敏感词')
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | 关键词 |

#### Returns

``"update"`` \| ``"delete"``

状态（update ｜ delete），告知用户是删除了树上的节点还是单纯的更新了节点

#### Defined in

[index.ts:169](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L169)

___

### filter

▸ **filter**(`text`, `options?`): `FilterData`

过滤文本

**`Example`**

```typescript
mint.add('无法通过')
let status = mint.filter('这是一句无法通过的文本')
console.log(status) // { words: ["无法通过"], text: "这是一句****的文本" }

status = mint.filter('这是一句无法通过的文本', { replace: false })
console.log(status) // { words: ["无法通过"], text: "这是一句无法通过的文本" }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | 文本内容 |
| `options?` | `Pick`<`FilterOptions`, ``"replace"``\> | - |

#### Returns

`FilterData`

FilterData

#### Defined in

[index.ts:134](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L134)

___

### pop

▸ `Private` **pop**(`key`, `len`, `node?`, `carry?`, `idx?`): ``"update"`` \| ``"delete"``

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `string` | `undefined` |
| `len` | `number` | `undefined` |
| `node?` | `default` | `undefined` |
| `carry` | ``"update"`` \| ``"delete"`` | `'delete'` |
| `idx` | `number` | `0` |

#### Returns

``"update"`` \| ``"delete"``

#### Defined in

[index.ts:175](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L175)

___

### put

▸ `Private` **put**(`key`, `len`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `len` | `number` |

#### Returns

`void`

#### Defined in

[index.ts:295](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L295)

___

### search

▸ `Private` **search**(`text`, `options?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `options` | `FilterOptions` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `words` | `string`[] |

#### Defined in

[index.ts:61](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L61)

___

### verify

▸ **verify**(`text`): `boolean`

检测文本是否通过验证

**`Example`**

```typescript
mint.add('无法通过')
const status = mint.verify('这是一句无法通过的文本')
console.log(status) // false
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | 文本内容 |

#### Returns

`boolean`

Boolean

#### Defined in

[index.ts:152](https://github.com/ZhelinCheng/mint-filter/blob/f25e001/src/index.ts#L152)
