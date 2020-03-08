/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-28 20:45:47
 * @LastEditTime: 2020-03-08 17:40:48
 * @LastEditors: Zhelin Cheng
 * @Description: 测试
 */

import { Node, Tree } from '../src/core'

describe('Core test.', () => {
  const root = new Node('root', {
    depth: 0
  })

  const node = new Node('N', {
    parent: root,
    word: true
  })

  it('Root Node :', () => {
    expect(root).toEqual(expect.objectContaining({
      key: 'root',
      children: {},
      word: false,
      depth: 0,
      failure: undefined,
      parent: undefined
    }))
  })

  it('Children Node:', () => {
    expect(node).toEqual(expect.objectContaining({
      key: 'N',
      children: {},
      word: true,
      depth: 1,
      failure: undefined,
      parent: root
    }))
  })


  it('Class Tree:', () => {
    const tree = new Tree()
    expect(tree.root).toEqual(expect.objectContaining({}))
    expect(tree.insert('t')).toBeTruthy()
    expect(tree.search('a')).toBeUndefined()

    const tree2 = new Tree()
    expect(tree2.insert('test')).toBeTruthy()
    expect(tree2.insert('t')).toBeTruthy()
    expect(tree2.insert('te')).toBeTruthy()
    expect(tree2.root.children['t'].word).toBeTruthy()
    expect(tree2.root.children['t'].children['e'].word).toBeTruthy()
  })
})
