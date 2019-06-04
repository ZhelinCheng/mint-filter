/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: index.test
 */

import path from 'path'
import Mint from '../src/index'

describe('Index test.', () => {
  const mint = new Mint(path.resolve(__dirname, './test.txt'))
  it('Function filterSync:', () => {
    expect(mint.filterSync('TEST').text).toBe('****')
  })

  it('Function filter:', async () => {
    let data = await mint.filter('TEST')
    expect(await data.text).toBe('****')
  })
})
