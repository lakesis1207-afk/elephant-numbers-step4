// 음성 목록 중 마을 열림·풍선·많다적다·선 긋기 부분. (voiceLines.js가 이어 붙인다)
// 이미 녹음한 묶음(시작·지도, 수 세기, 동물·스티커 …)은 그대로 두고, 새 문장은 새 묶음에 넣는다.
// 그래야 예전 녹음 zip을 다시 나눠도 줄 수가 맞는다.
import * as S from './script.js';
import { VILLAGES, previousVillage, nextVillage } from '../villages/index.js';

const range = (a, b, step = 1) => Array.from({ length: Math.floor((b - a) / step) + 1 }, (_, i) => a + i * step);
const line = (group, id, text) => ({ group, id, text });

function villageLines() {
  const later = VILLAGES.slice(1);
  return [
    // 숲속 다음 마을부터는 바로 앞 마을을 알려 준다 (숲속은 "사바나 마을을 먼저…"로 시작·지도 묶음에 있음)
    ...later.slice(1).map((v) => line('마을 열림', `locked-after-${v.key}`, S.lockedVillage(v.name, previousVillage(v.key).name))),
    ...later.flatMap((v) => [
      line('마을 열림', `${v.key}-enter`, v.detail.story.enterVoice),
      line('마을 열림', `${v.key}-story`, v.detail.story.storyVoice),
    ]),
  ];
}

function stickerLines() {
  const g = '동물·스티커 2';
  const later = VILLAGES.slice(1);
  const animalCount = VILLAGES.reduce((n, v) => n + v.detail.animals.length + (v.detail.special ? 1 : 0), 0);
  const savannaCount = VILLAGES[0].detail.animals.length + 1; // 사바나 동물 + 특별 친구까지는 "동물·스티커"에 있다
  return [
    ...later.flatMap((v) => v.detail.animals.map((a) => line(g, `name-${a.key}`, a.name))),
    ...later.flatMap((v) => {
      const next = nextVillage(v.key);
      return v.detail.animals.flatMap((a) => [
        line(g, `sticker-${a.key}`, S.stickerLine(a.name, true)),
        line(g, `sticker-again-${a.key}`, S.stickerLine(a.name, false)),
        ...(next ? [
          line(g, `sticker-${a.key}-open-${next.key}`, S.stickerLine(a.name, true, next.name)),
          line(g, `sticker-again-${a.key}-open-${next.key}`, S.stickerLine(a.name, false, next.name)),
        ] : []),
      ]);
    }),
    ...range(savannaCount + 1, animalCount).map((n) => line(g, `book-${n}`, S.bookCount(n))),
  ];
}

export const villageVoiceLines = () => [
  ...villageLines(), ...stickerLines(),
];
