/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: core.test
 */

import path from 'path'
import { getAllKeywords, readFile } from '../src/core'

describe('Core test.', () => {
  it('Function readFile:', () => {
    expect(readFile(path.resolve(__dirname, './test.txt'))).toBe('TEST')
  })

  it('Function getAllKeywords:', () => {
    expect(getAllKeywords(path.resolve(__dirname, './test.txt'))).toHaveLength(1)
  })
})
