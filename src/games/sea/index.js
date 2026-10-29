// 바닷가 마을 게임 3종: 받아내림 빼기 (수직선 거꾸로 뛰기, 물고기 빼기, 빈칸 채우기)
import { randInt, nearChoices, wait } from '@공통/games/logic.js';
import { makeChoiceGame } from '../choice.js';
import { pics, bigText, column } from '../visuals.js';
import { showBy, hopLine, balanceScale } from '../visuals4.js';
import * as T from '../../audio/step4Script.js';

const MAX_DIGIT = 9;

/** 받아내림이 생기는 빼기: 전체(11~maxTotal)에서 b를 빼면 일의 자리가 모자란다. 남는 수는 2 이상 */
function borrowQuestion(maxTotal) {
  for (;;) {
    const total = randInt(11, maxTotal);
    const lo = (total % 10) + 1;
    const hi = Math.min(MAX_DIGIT, total - 2);
    if (lo <= hi) return { total, b: randInt(lo, hi) };
  }
}

const HOP_MS = 550;

const numlineGame = makeChoiceGame({
  key: 'numline',
  background: 'sea-base',
  levels: [[13], [16], [19]],
  build({ range: [maxTotal] }) {
    const { total, b } = borrowQuestion(maxTotal);
    const left = total - b;
    const line = hopLine(Math.max(1, left - 1), total, total);
    let hops = 0;
    return {
      answer: left,
      options: nearChoices(left, 1, 19),
      scene: column(line.el, bigText(`${total} − ${b} = ?`)),
      setup: ({ run, sfx }) => {
        line.el.addEventListener('click', () => {
          run.poke();
          if (run.state.busy || hops >= b || !line.hop()) return;
          hops += 1;
          sfx.pop();
        });
      },
      onHint: async () => {
        line.reset();
        hops = 0;
        for (let i = 0; i < b; i++) {
          await wait(HOP_MS);
          line.hop();
          hops += 1;
        }
      },
      prompt: T.NUMLINE_PROMPT,
      hintText: T.NUMLINE_HINT,
    };
  },
});

const fishGame = makeChoiceGame({
  key: 'fish',
  background: 'sea-base',
  levels: [[13, 'pic'], [19, 'both'], [19, 'eq']],
  build({ range: [maxTotal, mode] }) {
    const { total, b } = borrowQuestion(maxTotal);
    const left = total - b;
    return {
      answer: left,
      options: nearChoices(left, 1, 19),
      scene: showBy(mode, pics(total, 'fish', b), `${total} − ${b} = ?`),
      prompt: mode === 'eq' ? T.EQ_PROMPT : T.FISH_PIC_PROMPT,
      hintText: T.borrowHint(total, b),
    };
  },
});

const blankGame = makeChoiceGame({
  key: 'blank',
  background: 'sea-base',
  levels: [['pic'], ['both'], ['eq']],
  build({ range: [mode] }) {
    const a = randInt(2, MAX_DIGIT);
    const b = randInt(Math.max(2, 11 - a), MAX_DIGIT);
    const sum = a + b;
    const scale = balanceScale(a, sum, mode);
    return {
      answer: b,
      options: nearChoices(b, 2, MAX_DIGIT),
      scene: mode === 'eq' ? column(scale.el, bigText(`${a} + □ = ${sum}`)) : scale.el,
      onTry: scale.preview,
      onHint: async () => scale.preview(b),
      prompt: T.BLANK_PROMPT,
      hintText: mode === 'pic' ? T.BLANK_PIC_HINT : T.blankHint(a, sum),
    };
  },
});

export const SEA_GAMES = Object.freeze({ numline: numlineGame, fish: fishGame, blank: blankGame });
