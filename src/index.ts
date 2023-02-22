/*
 * @Author       : 程哲林
 * @Date         : 2023-02-20 20:03:15
 * @LastEditors  : 程哲林
 * @LastEditTime : 2023-02-22 21:57:56
 * @FilePath     : /mint-filter/src/index.ts
 * @Description  : 未添加文件描述
 */

import Node from './node';

/* public void delete(String key)
{  root = delete(root, key, 0);  }
private Node delete(Node x, String key, int d)
{
   if (x == null) return null;
   if (d == key.length())
      x.val = null;
   else
   {
      char c = key.charAt(d);
      x.next[c] = delete(x.next[c], key, d+1);
}
   if (x.val != null) return x;
   for (char c = 0; c < R; c++)
      if (x.next[c] != null) return x;
   return null;
}
 */

class Mint {
  root: Node = new Node('root');

  constructor(keys: string[]) {
    const len = keys.length;
    for (let idx = 0; idx < len; idx++) {
      this.add(keys[idx]);
    }
  }

  delete(key: string) {
    this.pop(key, key.length, this.root);
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

      if (type === 'delete') {
        console.log(node);
        delete node.children[val];
      }

      return type;
    }
  }

  add(key: string): Node {
    const len = key.length;
    return this.put(key, len);
  }

  private put(key: string, len: number, node?: Node, idx = 0): Node {
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
    node.children[val] = this.put(key, len, next || new Node(val), idx + 1);

    node.count++;
    return node;
  }
}

/* const mint = new Mint(['she', 'shes', 'abc', 'sh']);
console.log(mint.delete('sh'), JSON.stringify(mint.root));
 */

const mint = new Mint(['she', 'shx']);
console.log(JSON.stringify(mint.root));

export default Mint;
