// 공룡 나라 (4단계): 순서·짝수 홀수

export const DINO = Object.freeze({
  key: 'dino',
  animals: [
    { key: 'trex', name: '티라노사우루스' },
    { key: 'brachio', name: '브라키오사우루스' },
    { key: 'stego', name: '스테고사우루스' },
    { key: 'ptera', name: '프테라노돈' },
  ],
  story: {
    title: '공룡 발자국을 따라가요!',
    icon: { kind: 'prop', name: 'footprint' },
    enterVoice: '공룡 나라야! 뛰어 세고, 짝수 홀수도 찾아 보자!',
    storyVoice: '공룡 발자국을 따라가요! 뛰어 세고, 짝수와 홀수를 찾고, 이야기 문제도 풀어 봐!',
  },
  games: [
    {
      key: 'skip',
      name: '발자국 뛰어 세기',
      scene: [
        { kind: 'prop', name: 'footprint', style: 'left:2cqh;bottom:2cqh;width:9cqh;height:11cqh' },
        { kind: 'prop', name: 'footprint', style: 'right:1cqh;bottom:3cqh;width:9cqh;height:11cqh' },
      ],
    },
    {
      key: 'evenodd',
      name: '짝수·홀수',
      scene: [
        { kind: 'prop', name: 'dino-egg', style: 'left:0;bottom:2cqh;width:11cqh;height:13cqh' },
        { kind: 'prop', name: 'dino-egg', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
    {
      key: 'story',
      name: '이야기 문제',
      scene: [
        { kind: 'character', name: 'trex', style: 'height:16cqh;left:0;bottom:2cqh' },
        { kind: 'character', name: 'brachio', style: 'height:16cqh;right:0;bottom:2cqh' },
      ],
    },
  ],
});
