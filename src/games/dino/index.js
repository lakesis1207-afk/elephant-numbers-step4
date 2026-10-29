// 공룡 나라 게임 3종: 뛰어 세기(10·5·2씩), 짝수·홀수, 이야기 문제
import { h } from '@공통/widgets/dom.js';
import { randInt, pickOne, nearChoices } from '@공통/games/logic.js';
import { makeChoiceGame, withDistractors } from '../choice.js';
import { footprints } from '../visuals.js';
import { eggPairs } from '../visuals4.js';
import * as T from '../../audio/step4Script.js';

const STEPS = 5; // 발자국 수
const MAX_NUM = 100;

/** 시작 수: 10씩은 1~9, 5씩은 5의 배수, 2씩은 아무 수 */
const START = { 10: () => randInt(1, 9), 5: () => 5 * randInt(1, 12), 2: () => randInt(1, 30) };

const skipGame = makeChoiceGame({
  key: 'skip',
  background: 'dino-base',
  levels: [[10, 'end'], [5, 'any'], [2, 'any']],
  build({ range: [step, blank] }) {
    const start = START[step]();
    const seq = Array.from({ length: STEPS }, (_, i) => start + i * step);
    const at = blank === 'end' ? STEPS - 1 : randInt(0, STEPS - 1);
    const answer = seq[at];
    return {
      answer,
      options: withDistractors(answer, [answer - step, answer + step, answer - 1, answer + 1], 1, MAX_NUM),
      scene: footprints(seq.map((v, i) => (i === at ? '?' : v))),
      prompt: T.SKIP_PROMPT,
      hintText: T.skipHint(step, answer),
    };
  },
});

const EVEN = '짝수';
const ODD = '홀수';

const evenoddGame = makeChoiceGame({
  key: 'evenodd',
  wide: true,
  layout: 'low',
  background: 'dino-base',
  keepOrder: true,
  levels: [[10, 'pic'], [20, 'pic'], [99, 'num']],
  build({ range: [max, mode] }) {
    const n = randInt(1, max);
    const even = n % 2 === 0;
    return {
      answer: even ? EVEN : ODD,
      options: [EVEN, ODD],
      scene: mode === 'pic' ? eggPairs(n) : bigText(String(n)),
      prompt: mode === 'pic' ? T.EVEN_PIC_PROMPT : T.EVEN_NUM_PROMPT,
      hintText: even ? T.EVEN_HINT : T.ODD_HINT,
    };
  },
});

const MAX_STORY = 20;

const storyGame = makeChoiceGame({
  key: 'story',
  background: 'dino-base',
  levels: [[0], [1], [2]],
  build({ range: [level] }) {
    const [text, a, b, op] = pickOne(T.STORIES[level]);
    const answer = T.storyAnswer(a, b, op);
    return {
      answer,
      options: nearChoices(answer, 1, MAX_STORY),
      scene: h('div', { class: 's4-story' }, text),
      prompt: text,
      hintText: T.storyHint(a, b, op),
    };
  },
});

export const DINO_GAMES = Object.freeze({ skip: skipGame, evenodd: evenoddGame, story: storyGame });
