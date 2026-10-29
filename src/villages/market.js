// 시장 마을 (4단계 다섯째 마을): 시계·돈

export const MARKET = Object.freeze({
  key: 'market',
  animals: [
    { key: 'dog', name: '강아지' },
    { key: 'cat', name: '고양이' },
    { key: 'chick', name: '병아리' },
    { key: 'pig', name: '돼지' },
    { key: 'cow', name: '젖소' },
  ],
  story: {
    title: '시장에서 시계와 돈을 배워요!',
    icon: { kind: 'prop', name: 'basket' },
    enterVoice: '시장 마을이야! 시계도 보고, 동전도 세어 보자!',
    storyVoice: '시장에서 시계와 돈을 배워요! 시계를 맞추고, 동전을 세고, 물건도 사 봐!',
  },
  games: [
    {
      key: 'clock',
      name: '시계 맞추기',
      scene: [
        { kind: 'character', name: 'dog', style: 'height:16cqh;left:0;bottom:2cqh' },
        { kind: 'prop', name: 'star', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
    {
      key: 'coins',
      name: '동전 세기',
      scene: [
        { kind: 'character', name: 'cat', style: 'height:16cqh;left:0;bottom:2cqh' },
        { kind: 'prop', name: 'basket', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
    {
      key: 'buy',
      name: '물건 사기',
      scene: [
        { kind: 'character', name: 'pig', style: 'height:16cqh;left:0;bottom:2cqh' },
        { kind: 'prop', name: 'fruit-apple', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
  ],
});
