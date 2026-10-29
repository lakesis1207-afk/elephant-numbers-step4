// 사바나 마을 (4단계 첫 마을): 100까지 수

export const SAVANNA = Object.freeze({
  key: 'savanna',
  animals: [
    { key: 'elephant', name: '코끼리' },
    { key: 'giraffe', name: '기린' },
    { key: 'hippo', name: '하마' },
    { key: 'rhino', name: '코뿔소' },
    { key: 'lion', name: '사자' },
    { key: 'tiger', name: '호랑이' },
    { key: 'zebra', name: '얼룩말' },
    { key: 'lemur', name: '여우원숭이' },
    { key: 'capybara', name: '카피바라' },
  ],
  // 동물을 다 모으면 오는 특별 친구 (다른 마을은 아직 없음)
  // from: "사바나 친구들을 다 모았어!"의 앞말
  special: { key: 'owl', name: '부엉이', from: '사바나' },
  story: {
    title: '100까지 수와 친해져요!',
    icon: { kind: 'icon', name: 'game-fruit' },
    enterVoice: '사바나 마을이야! 백까지 수랑 친해져 보자!',
    storyVoice: '100까지 수와 친해져요! 바나나를 세고, 열 개씩 묶고, 숫자판 빈칸도 채워 봐!',
  },
  games: [
    {
      key: 'bunch',
      name: '바나나 묶음 세기',
      scene: [
        { kind: 'prop', name: 'fruit-banana', style: 'left:0;bottom:2cqh;width:11cqh;height:13cqh' },
        { kind: 'prop', name: 'fruit-banana', style: 'right:0;bottom:2cqh;width:11cqh;height:13cqh' },
      ],
    },
    {
      key: 'group',
      name: '10개 모아 묶기',
      scene: [
        { kind: 'prop', name: 'basket', style: 'left:0;bottom:1cqh;width:22cqh;height:16cqh' },
      ],
    },
    {
      key: 'board',
      name: '100 숫자판 빈칸',
      scene: [
        { kind: 'prop', name: 'board', style: 'left:0;bottom:1cqh;width:20cqh;height:16cqh' },
      ],
    },
  ],
});
