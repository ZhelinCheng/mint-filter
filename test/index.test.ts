/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: index.test
 */

import Mint from '../src/index'
import path from 'path'

describe('Index test.', () => {
  it('Class Mint:', () => {
    const mint = new Mint(path.resolve(__dirname, './test.txt'))
    expect(mint.filterSync('TEST').text).toBe('****')
  })
})
