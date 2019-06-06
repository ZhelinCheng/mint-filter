/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: index.test
 */

import Mint from '../src/index'

describe('Index test.', () => {
  const mint = new Mint(['TEST'])
  it('Function filterSync:', () => {
    expect(mint.filterSync('test').text).toBe('****')
  })

  it('Function filter:', async () => {
    let data = await mint.filter('TEST')
    expect(await data.text).toBe('****')
  })

  it('Function everySync:', () => {
    expect(mint.everySync('test')).toBeFalsy()
  })

  it('Function every:', async () => {
    let data = await mint.every('TES')
    expect(data).toBeTruthy()
  })
})
