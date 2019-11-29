/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-11-29 17:08:06
 * @LastEditors: Zhelin Cheng
 * @Description: Core
 */

import Node from './node'
import Tree from './tree'

export interface Children {
  [key: string]: Node
}

export {
  Node,
  Tree
}
