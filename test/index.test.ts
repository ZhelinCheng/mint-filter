/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2019-12-02 14:07:28
 * @LastEditors: Zhelin Cheng
 * @Description: Test Index
 */


import Mint, { FilterValue } from '../src/index'

describe('Index test.', () => {
  let mint = new Mint(['拼多多', '多少', '多多', '爆', '少多', 1111, 'abc'])
  const falsyStr = `0、爆，拼多多；1、拼多爆；2、拼多少；3、多少多；4、1111大促；5、智能ABC`
  const truthyStr = `这是一段没有敏感词的字符串，我在这里写了很多，十一月一日有很多优惠，我们要多购买。`
  const returnContentFalsy: FilterValue = {
    text: '0、*，***；1、拼多*；2、拼**；3、**多；4、****大促；5、智能***',
    filter: ['爆', '拼多多', '少少', '多少', '1111', 'ABC'],
    pass: false
  }
  const returnContentTruthy: FilterValue = {
    text: truthyStr,
    filter: [],
    pass: true
  }

  it('Class Mint:', () => {
    let root = mint.root
    expect(root.children['拼'].children['多'].failure)
      .toEqual(expect.objectContaining(root.children['多']))

    expect(root.children['A'].children['B'].children['C'].failure)
      .toEqual(expect.objectContaining(root))
  })

  // To be falsy
  it('Function filterSync:', () => {
    expect(mint.filterSync(falsyStr)).toEqual(expect.objectContaining(returnContentFalsy))
  })

  it('Function filterSync:', () => {
    expect(mint.filterSync(falsyStr, false)).toEqual(expect.objectContaining({
      ...returnContentFalsy,
      text: falsyStr
    }))
  })

  it('Function filter:', async () => {
    expect(await mint.filter(falsyStr)).toEqual(expect.objectContaining(returnContentFalsy))
  })

  it('Function filter:', async () => {
    expect(await mint.filter(falsyStr, false)).toEqual(expect.objectContaining({
      ...returnContentFalsy,
      text: falsyStr
    }))
  })

  it('Function everySync:', () => {
    expect(mint.everySync(falsyStr)).toBeFalsy()
  })

  it('Function every:', async () => {
    let data = await mint.every(falsyStr)
    // expect(data).toBeTruthy()
    expect(data).toBeFalsy()
  })

  it('Function includes:', async () => {
    expect(mint.validator(falsyStr)).toBeTruthy()
  })

  // To be truthy
  it('Function filterSync:', () => {
    expect(mint.filterSync(truthyStr)).toEqual(expect.objectContaining(returnContentTruthy))
  })

  it('Function filter:', async () => {
    expect(await mint.filter(truthyStr)).toEqual(expect.objectContaining(returnContentTruthy))
  })

  it('Function everySync:', () => {
    expect(mint.everySync(truthyStr)).toBeTruthy()
  })

  it('Function every:', async () => {
    let data = await mint.every(truthyStr)
    expect(data).toBeTruthy()
  })

  it('Function includes:', async () => {
    expect(mint.validator(truthyStr)).toBeFalsy()
  })
})
