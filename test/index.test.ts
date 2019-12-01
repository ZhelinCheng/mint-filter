/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: index.test
 */

import Mint from '../src/index'

describe('Index test.', () => {
  let mint = new Mint(['京东', '东京', '淘宝', '拼多多', '双十一', 1111, '优惠券', '京东优惠券', '多多'])
  const str = `这是简单的测试文字：这里的【京东京】是一段测试文字马上就要到双十一了，今年1111我屯了很多优惠券，有京东的，有淘宝的，也有拼多多的，但我最多的是京东优惠券。看来这个双十一我又要买很多东西了，毕竟多多益善。`

  it('Class Mint:', () => {
    let root = mint.root
    expect(root.children['东'].children['京'].failure)
      .toEqual(expect.objectContaining(root.children['京']))

    expect(root.children['京'].children['东'].failure)
      .toEqual(expect.objectContaining(root.children['S']))

    expect(root.children['淘'].children['宝'].failure)
      .toEqual(expect.objectContaining(root))
  })

  it('Function filterSync:', () => {
    expect(mint.filterSync(str1)).toEqual(expect.objectContaining({
      'filter': [ 'T', 'TEST', 'ST', 'EST', 'BD', 'D' , '33', 'VV', 'VVCC'],
      'pass': false,
      'text': '*****1*****2**es3b******4e**5es*6a**bX**XXX****AA'
    }))
  })

  it('Function filter:', async () => {
    expect(await mint.filter(str)).toEqual(expect.objectContaining({
      'filter': ['T', 'TEST', 'ST', 'EST', 'BD', 'D', '33', 'VV', 'VVCC' ],
      'pass': false,
      'text': '*****1*****2**es3b******4e**5es*6a**bX**XXX****AA'
    }))
  })

  it('Function everySync:', () => {
    expect(mint.everySync(str)).toBeFalsy()
  })

  it('Function every:', async () => {
    let data = await mint.every(str)
    expect(data).toBeTruthy()
  })
})
