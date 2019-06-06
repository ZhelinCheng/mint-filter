/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: index.test
 */

import Mint from '../src/index'

describe('Index test.', () => {
  const mint = new Mint(['test', 'bd', 'st'])
  it('Function filterSync:', () => {
    expect(mint.filterSync('1ttest2bd')).toEqual(expect.objectContaining({
      text: '1t****2**',
      filter: [ 'TEST', 'BD' ],
      pass: false
    }))
  })

  it('Function filter:', async () => {
    let data = await mint.filter('1ttest2bd')
    expect(data).toEqual(expect.objectContaining({
      text: '1t****2**',
      filter: [ 'TEST', 'BD' ],
      pass: false
    }))
  })

  it('Function everySync:', () => {
    expect(mint.everySync('test')).toBeFalsy()
  })

  it('Function every:', async () => {
    let data = await mint.every('TES')
    expect(data).toBeTruthy()
  })
})
