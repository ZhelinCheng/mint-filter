/*
 * @Author       : 程哲林
 * @Date         : 2023-02-20 20:03:15
 * @LastEditors  : 程哲林
 * @LastEditTime : 2023-02-24 14:23:27
 * @FilePath     : /mint-filter/src/index.ts
 * @Description  : 未添加文件描述
 */

import Node from './node';

interface FilterOptions {
  // sensitive?: boolean;
  replace?: boolean;
  verify?: boolean;
}

class Mint {
  root: Node = new Node('root');

  constructor(keys: string[]) {
    const len = keys.length;
    for (let idx = 0; idx < len; idx++) {
      this.add(keys[idx], false);
    }

    this.build();
  }

  // 构建
  private build() {
    const queue: Node[] = [];
    queue.push(this.root);

    let idx = 0;
    while (queue.length > idx) {
      const beginNode = queue[idx];
      const map = beginNode.children;
      for (const key in beginNode.children) {
        const node = map[key];
        let failNode = beginNode.fail;

        while (failNode && !failNode.children[key]) {
          failNode = failNode.fail;
        }

        node.fail = failNode?.children[key] || this.root;

        queue.push(node);
      }

      idx++;
    }
  }

  private search(
    text: string,
    options: FilterOptions = {
      replace: true,
    },
  ) {
    let node: Node | undefined = this.root;
    const fText: string[] = [];
    const oText: string[] = [];
    const words: string[] = [];

    const { replace = true, verify = false } = options;

    const textLen = text.length;
    for (let i = 0; i < textLen; i++) {
      // const key = text.charAt(i);
      const oKey = text[i];
      const key = oKey.toLowerCase();

      while (node && !node?.children[key]) {
        node = node?.fail;
      }
      node = node?.children[key] || this.root;

      fText.push(oKey);
      oText.push(oKey);

      if (node.word) {
        let idx = i + 1 - node.depth;
        let word = '';
        while (idx <= i) {
          const v = oText[idx];
          word += v;

          if (replace) {
            fText[idx] = '*';
          }

          idx++;
        }

        words.push(word);

        if (verify) {
          break;
        }
      }
    }

    return {
      words,
      text: fText.join(''),
    };
  }

  /**
   * 过滤文本
   * @param text 需要过滤的文本
   * @param options 过滤选项
   * @returns 输出
   */
  filter(text: string, options?: Pick<FilterOptions, 'replace'>) {
    return this.search(text, options);
  }

  /**
   * 验证文本是否有敏感词
   * @param text 需要验证的文本
   * @returns 是否通过
   */
  verify(text: string) {
    const { words } = this.search(text, { verify: true });
    return !words.length;
  }

  /**
   * 删除关键字
   * @param key 关键字
   * @returns update ｜ delete
   */
  delete(key: string) {
    const type = this.pop(key.toLowerCase(), key.length, this.root);
    this.build();
    return type;
  }

  private pop(
    key: string,
    len: number,
    node?: Node,
    carry: 'update' | 'delete' = 'delete',
    idx = 0,
  ): 'update' | 'delete' {
    if (!node) {
      return 'delete';
    }

    if (idx === len) {
      node.word = false;
      node.count--;
      // 需要删除的情况
      let isDel = true;
      for (const k in node.children) {
        if (k) {
          isDel = false;
          break;
        }
      }

      return isDel ? carry : 'update';
    } else {
      const val = key[idx];
      const next = node.children[val];
      const type = this.pop(
        key,
        len,
        next,
        node.word ? 'update' : carry,
        idx + 1,
      );

      node.count--;
      if (type === 'delete' && next?.count === 0) {
        delete node.children[val];
        // node.children[val] = undefined
      }

      return type;
    }
  }

  /**
   * 新增关键字
   * @param key 关键字
   * @returns Node
   */
  add(key: string, build = true): boolean {
    const lowKey = key.toLowerCase();
    const len = lowKey.length;
    this.put(lowKey, len);

    if (build) {
      this.build();
      /* const queue: Node[] = [this.root];
      let idx = 0;

      while (queue.length > idx) {
        const beginNode = queue[idx];
        const map = beginNode.children;
        const k = lowKey[idx];

        // FIX: 可以优化
        if (!k) {
          break;
        }

        const node = map[k];
        let failNode = beginNode.fail;

        while (failNode && !failNode.children[lowKey]) {
          failNode = failNode.fail;
        }
        node.fail = failNode?.children[lowKey] || this.root;

        queue.push(node);
        idx++;
      } */
    }

    return true;
  }

  /* private put(key: string, len: number, node?: Node, idx = 0): Node {
    if (!node) {
      node = this.root;
    }

    // 基线条件
    if (idx === len) {
      node.word = true;
      node.count++;
      return node;
    }

    const val = key[idx];
    const next = node.children[val];
    const depth = idx + 1;
    node.children[val] = this.put(
      key,
      len,
      next || new Node(val, depth),
      depth,
    );

    node.count++;
    return node;
  } */

  private put(key: string, len: number) {
    let node = this.root;
    const lastIdx = len - 1;
    node.count++;
    for (let idx = 0; idx < len; idx++) {
      const val = key[idx];
      const nextNode = node.children[val];

      if (nextNode) {
        nextNode.count++;
        node = nextNode;
      } else {
        const newNode = new Node(val, idx + 1);
        newNode.count = 1;
        node.children[val] = newNode;
        node = newNode;
      }

      if (lastIdx === idx && node.depth) {
        node.word = true;
      }
    }
  }
}

/* const arr = ['HER', 'SHR'];
const mint = new Mint(arr); */

// mint.delete('her')

// console.log(mint.root.children['s'].children)
// console.log(mint.root)

// console.log(mint2.root.children['s'].children['h'])

export default Mint;
