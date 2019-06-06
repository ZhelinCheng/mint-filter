/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: core.test
 */

import path from 'path'
import { getAllKeywords, readFile } from '../src/core'
import Node from '../src/core/node'
import Tree from '../src/core/tree'

describe('Core test.', () => {
  it('Function readFile:', () => {
    expect(readFile(path.resolve(__dirname, './test.txt'))).toBe('TEST')
  })

  it('Function getAllKeywords:', () => {
    expect(getAllKeywords(path.resolve(__dirname, './test.txt'))).toEqual(expect.arrayContaining(['TEST']))
  })

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
