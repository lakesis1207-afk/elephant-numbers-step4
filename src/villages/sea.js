// 바닷가 마을 (4단계): 받아내림 빼기

export const SEA = Object.freeze({
  key: 'sea',
  animals: [
    { key: 'penguin', name: '펭귄' },
    { key: 'crab', name: '꽃게' },
    { key: 'turtle', name: '거북이' },
    { key: 'dolphin', name: '돌고래' },
    { key: 'starfish', name: '불가사리' },
    { key: 'seaotter', name: '해달' },
  ],
  story: {
    title: '바닷가에서 빼기를 해요!',
    icon: { kind: 'prop', name: 'shell' },
    enterVoice: '바닷가 마을이야! 거꾸로 뛰면서 빼기를 해 보자!',
    storyVoice: '바닷가에서 빼기를 해요! 수직선을 거꾸로 뛰고, 물고기를 빼고, 빈칸도 채워 봐!',
  },
  games: [
    {
      key: 'numline',
      name: '수직선 거꾸로 뛰기',
      scene: [
        { kind: 'character', name: 'penguin', style: 'height:16cqh;left:0;bottom:2cqh' },
        { kind: 'prop', name: 'shell', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
    {
      key: 'fish',
      name: '물고기 빼기',
      scene: [
        { kind: 'prop', name: 'fish', style: 'left:0;bottom:2cqh;width:11cqh;height:13cqh' },
        { kind: 'prop', name: 'fish', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
    {
      key: 'blank',
      name: '저울 맞추기',
      scene: [
        { kind: 'character', name: 'crab', style: 'height:16cqh;left:0;bottom:2cqh' },
        { kind: 'prop', name: 'shell', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
  ],
});
