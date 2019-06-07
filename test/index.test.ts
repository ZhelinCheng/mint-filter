/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: index.test
 */

import Mint from '../src/index'

describe('Index test.', () => {
  let mint = new Mint(['test', 't', 'bd', 'd', 'st', 'ac'])
  let mint2 = new Mint([])
  const str1 = 'ttest1stest2stes3bbddstt4est5esd6'
  const str2 = 'bbdsst1sstt2acc'

  it('Class Mint:', () => {
    let root = mint.root
    expect(root.children['S'].children['T'].failure)
      .toEqual(expect.objectContaining(root.children['T']))

    expect(root.children['T'].children['E'].children['S'].failure)
      .toEqual(expect.objectContaining(root.children['S']))

    expect(root.children['A'].children['C'].failure)
      .toEqual(expect.objectContaining(root))
  })

  it('Function filterSync:', () => {
    expect(mint.filterSync(str1)).toEqual(expect.objectContaining({
      'filter': [ 'T', 'TEST', 'ST', 'EST', 'BD', 'D' ],
      'pass': false,
      'text': '*****1*****2**es3b******4e**5es*6'
    }))

    expect(mint2.filterSync(str2, false)).toEqual(expect.objectContaining({
      'filter': [ 'BD', 'ST', 'T', 'AC' ],
      'pass': false,
      'text': str2
    }))
  })

  it('Function filter:', async () => {
    expect(await mint.filter(str1)).toEqual(expect.objectContaining({
      'filter': [ 'T', 'TEST', 'ST', 'EST', 'BD', 'D' ],
      'pass': false,
      'text': '*****1*****2**es3b******4e**5es*6'
    }))

    expect(await mint2.filter(str2, false)).toEqual(expect.objectContaining({
      'filter': [ 'BD', 'ST', 'T', 'AC' ],
      'pass': false,
      'text': str2
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
