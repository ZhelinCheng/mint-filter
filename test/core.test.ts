/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: core.test
 */

import { Node, Tree } from '../src/core'

describe('Core test.', () => {
  it('Class Node:', () => {
    const node = new Node('test')
    expect(node).toEqual(expect.objectContaining({
      key: 'test',
      children: {},
      word: false,
      failure: undefined,
      parent: undefined
    }))
  })

  it('Class Tree:', () => {
    const tree = new Tree()
    expect(tree.root).toEqual(expect.objectContaining({}))
    expect(tree.insert('t')).toBeTruthy()
    expect(tree.search('a')).toBeUndefined()
  })
})
