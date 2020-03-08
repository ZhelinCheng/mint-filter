/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-08 17:49:12
 * @LastEditors: Zhelin Cheng
 * @Description: 主文件
 */

import { Node, Tree } from './core'

export interface FilterValue {
  text?: string | boolean
  wrods: Array<string | undefined>,
  pass?: boolean
}

interface FilterOptions {
  replace?: boolean
  words?: boolean
  every?: boolean
}

enum English {
  NONE = 'none',
  CAPITAL = 'capital',
  LOWER = 'lower'
}

// 选项参数
interface OptionsType {
  transform: 'none' | 'capital' | 'lower'
}

class Mint extends Tree {
  private options: OptionsType = { transform: English.NONE }

  constructor(keywords: Array<string | number> = [], options: OptionsType = { transform: English.NONE }) {
    super()
    const { transform } = options

    // 创建Trie树
    for (let item of keywords) {
      if (!item) continue
      item = item.toString()

      if (transform === English.NONE) {
        this.insert(item)
        continue;
      }

      if (/[a-z]/i.test(item)) {
        // 有字母
        item = transform === English.CAPITAL ? item.toLocaleUpperCase() : item.toLocaleLowerCase()
        this.insert(item)
      } else {
        this.insert(item)
      }
    }

    this.options = options
    this.createFailureTable()
  }

  /**
   * 收集敏感词
   * @param node 节点
   */
  private collectWord(node: Node): string {
    const arr = []
    do {
      arr.push(node.key)
      node = node.parent
    } while (node)
    return arr.reverse().join('')
  }

  /**
   * 筛选方法
   * @param word 文字
   * @param every 验证全部
   * @param replace 是否替换
   */
  private filterFunc(text: string, options: FilterOptions = {}): FilterValue {
    const {
      replace = true,
      every = true,
      words = true
    } = options

    // 字符大小写转换
    const { transform } = this.options
    if (transform !== English.NONE) {
      text = transform === English.CAPITAL ? text.toLocaleUpperCase() : text.toLocaleLowerCase()
    }

    // 字符长度
    const wordLen = text.length
    if (wordLen <= 0) {
      return {
        text: text,
        wrods: [],
        pass: true
      }
    }

    // 过滤后的文字
    let filterText = ''
    const filterWords = new Set([])

    // 当前树位置
    let currNode: Node | undefined = this.root
    let nextNode: Node | undefined

    // 失配路线
    let failure

    let isStart = false

    // 是否通过验证
    let isPass = true

    for (let endIndex = 0; endIndex < wordLen; endIndex++) {
      const key = text[endIndex]
      filterText += key
      nextNode = this.search(key, currNode.children)
      if (!nextNode) {
        failure = currNode.failure
        while (failure) {
          nextNode = this.search(key, failure.children)
          if (nextNode) break
          failure = failure.failure
        }
      }

      if (nextNode) {
        failure = nextNode
        do {
          if (failure.word) {
            isPass = false
            const len = failure.depth

            if (replace) {
              filterText = filterText.slice(0, -len) + '*'.repeat(len)
            }

            if (words) {
              filterWords.add(this.collectWord(failure))
            }
          }
          failure = failure.failure
        } while (failure.key !== 'root');
        currNode = nextNode

        if (every) {
          continue
        } else {
          break
        }
      }

      isStart = false
      currNode = this.root
    }

    return {
      text: filterText,
      wrods: Array.from(filterWords),
      pass: isPass
    }
  }

  /**
   * 快速验证是否存在敏感词
   * @param text 文本
   */
  validator(text: string): boolean {
    return this.filterFunc(text, {
      replace: false,
      every: false,
      words: false
    }).pass
  }

  /**
   * 过滤方法
   * @param text 文本
   * @param options 选项
   */
  filterSync(text: string, options?: FilterOptions): FilterValue {
    return this.filterFunc(text, options)
  }

  /**
   * 异步过滤方法
   * @param text 文本
   * @param options 选项
   */
  async filter(text: string, options?: FilterOptions): Promise<FilterValue> {
    return Promise.resolve(this.filterFunc(text, options))
  }
}

export default Mint

// if (require.main === module) {
//   let m = new Mint(['拼', '拼多多', '多少', '多多', '爆', '少多', 1111, 'ABC', '操', '我操你'])
//   console.log(m.validator(`0、爆，拼拼多多，拼多多；1、拼多爆；2、拼多少；3、多少多；4、1111大促；5、智能ABC；6、我操；7、我操呀`))
//   // console.log(m.root.children['我'].children['操'])
//   // let m = new Mint(['多少', '少'])
//   // console.log(m.filterSync(`多少少`))
// }
