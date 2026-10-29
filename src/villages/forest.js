// 숲속 마을 (4단계): 받아올림 더하기

export const FOREST = Object.freeze({
  key: 'forest',
  animals: [
    { key: 'rabbit', name: '토끼' },
    { key: 'squirrel', name: '다람쥐' },
    { key: 'panda', name: '판다' },
    { key: 'fox', name: '여우' },
    { key: 'owl', name: '부엉이' },
    { key: 'hedgehog', name: '고슴도치' },
  ],
  story: {
    title: '도토리를 더해 열을 만들어요!',
    icon: { kind: 'prop', name: 'acorn' },
    enterVoice: '숲속 마을이야! 도토리를 더해서 열을 먼저 만들어 보자!',
    storyVoice: '도토리를 더해요! 열을 먼저 채우고, 도토리를 더하고, 세 수도 더해 봐!',
  },
  games: [
    {
      key: 'fill10',
      name: '10 먼저 채우기',
      scene: [
        { kind: 'character', name: 'squirrel', style: 'height:16cqh;left:0;bottom:2cqh' },
        { kind: 'prop', name: 'acorn', style: 'right:1cqh;bottom:3cqh;width:10cqh;height:10cqh' },
      ],
    },
    {
      key: 'acorn',
      name: '도토리 더하기',
      scene: [
        { kind: 'prop', name: 'acorn', style: 'left:0;bottom:2cqh;width:11cqh;height:13cqh' },
        { kind: 'prop', name: 'acorn', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
    {
      key: 'three',
      name: '세 수 더하기',
      scene: [
        { kind: 'character', name: 'rabbit', style: 'height:16cqh;left:0;bottom:2cqh' },
        { kind: 'character', name: 'fox', style: 'height:16cqh;right:0;bottom:2cqh' },
      ],
    },
  ],
});
