/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
import {
  getAllKeywords,
  createTrieTree
} from './core'

class Mint {
  public keywords: object = {}
  constructor (keywordsPath?: string) {
    // 获取关键词数组
    let arr: Array<string> = getAllKeywords(keywordsPath)

    // 创建
    this.keywords = createTrieTree(arr)
  }
}

export default Mint

if (require.main === module) {
  // console.log(getAllKeywords())
  let m: Mint = new Mint()
  console.log(m.keywords)
}
