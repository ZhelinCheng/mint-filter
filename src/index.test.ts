import Mint from './index';

// const falsyStr = `0、爆，拼拼多多，拼多多；1、拼多爆；2、拼多少；3、多少多；4、1111大促；5、智能ABC；6、我操；7、我操呀`;
// const truthyStr = `这是一段没有敏感词的字符串，我在这里写了很多，十一月一日有很多优惠，我们要多购买。`;

describe('基础测试', () => {
  it('基本测验-自定义替换字符:', () => {
    const mint = new Mint(['拼多多', '多少'], { customCharacter: '_' });
    expect(mint.filter('拼多少，多少多').text).toEqual('拼__，__多');
  });

  it('基本测验-中文:', () => {
    const mint = new Mint(['拼多多', '多少']);
    expect(mint.filter('拼多少，多少多').text).toEqual('拼**，**多');
  });

  it('基本测验-失配', () => {
    const mint = new Mint(['ABCE', 'BCD']);
    expect(mint.filter('ABCDE').text).toEqual('A***E');
  });

  it('基本测验-字母（关键字大写）:', () => {
    const mint = new Mint(['HER', 'HEQ', 'XSHR']);
    expect(mint.filter('xsher').text).toEqual('xs***');
  });

  it('基本测验-字母（关键字小写）:', () => {
    const mint = new Mint(['her', 'heq', 'xshr']);
    expect(mint.filter('XSHER').text).toEqual('XS***');
  });

  it('基本测验-字母（全大写）:', () => {
    const mint = new Mint(['HER', 'HEQ', 'XSHR']);
    expect(mint.filter('XSHER')).toEqual(
      expect.objectContaining({
        words: ['HER'],
        text: 'XS***',
      }),
    );
  });

  it('基本测验-字母（全小写）:', () => {
    const mint = new Mint(['her', 'heq', 'xshr']);
    expect(mint.filter('xsher')).toEqual(
      expect.objectContaining({
        words: ['her'],
        text: 'xs***',
      }),
    );
  });

  it('基本测验-多词:', () => {
    const mint = new Mint(['her', 'heq', 'xshr']);
    expect(mint.filter('123_her_heq_xsher_heqher')).toEqual(
      expect.objectContaining({
        words: ['her', 'heq', 'her', 'heq', 'her'],
        text: '123_***_***_xs***_******',
      }),
    );
  });
});

describe('方法检测', () => {
  it('mint.add() :', () => {
    const mint = new Mint(['heq', 'xshr']);
    expect(mint.filter('xsher').text).toEqual('xsher');
    mint.add('HER');
    mint.add('her');
    expect(mint.filter('xsher').text).toEqual('xs***');
  });

  it('mint.delete() :', () => {
    const mint = new Mint(['her', 'heq', 'xshr']);
    expect(mint.filter('xsher').text).toEqual('xs***');
    mint.delete('HER');
    expect(mint.filter('xsher').text).toEqual('xsher');
    mint.delete('her');
  });

  it('mint.verify() :', () => {
    const mint = new Mint(['her', 'heq', 'xshr']);
    expect(mint.verify('XSHER')).toBeFalsy();
    expect(mint.verify('xshxxw')).toBeTruthy();
  });

  it('mint.filter() :', () => {
    const mint = new Mint(['her', 'heq', 'xshr']);
    expect(mint.filter('xsheqxx', { replace: false })).toEqual(
      expect.objectContaining({
        words: ['heq'],
        text: 'xsheqxx',
      }),
    );
  });

  it('混合测试 :', () => {
    const mint = new Mint(['her', 'heq', 'xshr']);
    mint.add('he');
    expect(mint.filter('xsher')).toEqual(
      expect.objectContaining({
        words: ['he', 'her'],
        text: 'xs***',
      }),
    );
    mint.delete('he');
    expect(mint.filter('xsher')).toEqual(
      expect.objectContaining({
        words: ['her'],
        text: 'xs***',
      }),
    );
    mint.add('he');
    mint.delete('her');
    expect(mint.filter('xsher')).toEqual(
      expect.objectContaining({
        words: ['he'],
        text: 'xs**r',
      }),
    );
  });
});

describe('随机测试', () => {
  it('混合测试 :', () => {
    const arr = ['her', 'heq', 'xshr', 'he'];
    const mint = new Mint(arr);
    const mint2 = new Mint([]);
    arr.map((str) => {
      mint2.add(str);
    });

    expect(mint.root).toEqual(expect.objectContaining(mint2.root));
  });
});
