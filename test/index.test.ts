/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: index.test
 */

import Mint from '../src/index'

describe('Index test.', () => {
  let mint = new Mint(['test', 'bd', 'st'])

  it('Function filterSync:', () => {
    expect(mint.filterSync('1ttest2bd')).toEqual(expect.objectContaining({
      'filter': [
        'TEST',
        'BD',
      ],
      'pass': false,
      'text': '1t****2**'
    }))

    expect(mint.filterSync('1ttest2bd', false)).toEqual(expect.objectContaining({
      'filter': [
        'TEST',
        'BD',
      ],
      'pass': false,
      'text': '1ttest2bd'
    }))
  })

  it('Function filter:', async () => {
    expect(await mint.filter('1ttest2bd')).toEqual(expect.objectContaining({
      'filter': [
        'TEST',
        'BD',
      ],
      'pass': false,
      'text': '1t****2**'
    }))

    expect(await mint.filter('1ttest2bd', false)).toEqual(expect.objectContaining({
      'filter': [
        'TEST',
        'BD',
      ],
      'pass': false,
      'text': '1ttest2bd'
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
