/*
 * @Author: Zhelin Cheng
 * @Date: 2019-08-24 12:19:20
 * @LastEditTime: 2020-03-06 18:42:35
 * @LastEditors: Zhelin Cheng
 * @Description: Test Index
 */


import Mint, { FilterValue } from '../src/index'

const falsyStr = `0、爆，拼拼多多，拼多多；1、拼多爆；2、拼多少；3、多少多；4、1111大促；5、智能ABC；6、我操；7、我操呀`
const truthyStr = `这是一段没有敏感词的字符串，我在这里写了很多，十一月一日有很多优惠，我们要多购买。`

describe('Index test one.', () => {
  let mint = new Mint(['拼', '拼多多', '多少', '多多', '爆', '少多', 1111, 'ABC', '操', '我操你'])
  const returnContentFalsy: FilterValue = {
    text: '0、*，****，***；1、*多*；2、***；3、**多；4、****大促；5、智能***；6、我*；7、我*呀',
    filter: ['爆', '拼', '多多', '多少', '1111', 'ABC', '操'],
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


describe('Index test two.', () => {
  it('Function filterSync 1:', () => {
    const mint = new Mint(['拼多多', '多少'])
    expect(mint.filterSync('拼多少，多少多').text).toEqual('拼**，**多')
  })

  it('Function filterSync 2:', () => {
    const mint = new Mint(['多', '多少'])
    expect(mint.filterSync('多多少')).toEqual(expect.objectContaining({
      text: '**少',
      filter: ['多'],
      pass: false
    }))
  })
})


describe('Index test three.', () => {
  it('Function filterSync 1:', () => {
    const mint = new Mint(['拼多多', '多少', 'ABC'], {
      transform: 'capital'
    })
    expect(mint.filterSync('拼多少，多少多，abc也是错误的').text).toEqual('拼**，**多，***也是错误的')
  })

  it('Function filterSync 2:', () => {
    const mint = new Mint(['多', '多少', 'ABC'], {
      transform: 'lower'
    })
    expect(mint.filterSync('多多少，abc哈哈')).toEqual(expect.objectContaining({
      text: '**少，***哈哈',
      filter: ['多', 'abc'],
      pass: false
    }))
  })
})
