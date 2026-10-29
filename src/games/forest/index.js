// 숲속 마을 게임 3종: 받아올림 더하기 (10 먼저 채우기, 도토리 더하기, 세 수 더하기)
import { randInt, nearChoices, pickOne } from '@공통/games/logic.js';
import { makeChoiceGame } from '../choice.js';
import { pics, pair, bigText } from '../visuals.js';
import { showBy, acornFill } from '../visuals4.js';
import * as T from '../../audio/step4Script.js';

const MAX_DIGIT = 9;
const MIN_SUM = 11; // 받아올림이 있는 합

/** 받아올림이 생기는 두 수: a + b ≥ 11, 둘 다 한 자리 */
const carryPair = (aMin, aMax) => {
  const a = randInt(aMin, aMax);
  return [a, randInt(Math.max(2, MIN_SUM - a), MAX_DIGIT)];
};

const fill10Game = makeChoiceGame({
  key: 'fill10',
  background: 'forest-base',
  levels: [[9, 9, 'pic'], [7, 8, 'pic'], [7, 9, 'eq']],
  build({ range: [aMin, aMax, mode] }) {
    const [a, b] = carryPair(aMin, aMax);
    const fill = acornFill(a, b);
    return {
      answer: a + b,
      options: nearChoices(a + b, MIN_SUM, 18),
      scene: showBy(mode, pair(fill.frame, '+', fill.loose), `${a} + ${b} = ?`),
      setup: ({ sfx }) => fill.bind(sfx),
      prompt: mode === 'eq' ? T.EQ_PROMPT : T.FILL10_PROMPT,
      hintText: T.carryHint(a, b),
    };
  },
});

const acornGame = makeChoiceGame({
  key: 'acorn',
  background: 'forest-base',
  levels: [['pic'], ['both'], ['eq']],
  build({ range: [mode] }) {
    const [a, b] = carryPair(2, MAX_DIGIT);
    return {
      answer: a + b,
      options: nearChoices(a + b, MIN_SUM, 18),
      scene: showBy(mode, pair(pics(a, 'acorn'), '+', pics(b, 'acorn')), `${a} + ${b} = ?`),
      prompt: mode === 'eq' ? T.EQ_PROMPT : T.ACORN_PIC_PROMPT,
      hintText: T.carryHint(a, b),
    };
  },
});

/** 짝꿍(합이 10)의 자리: 앞 / 뒤 / 섞여서 */
const ORDERS = {
  front: (x, y, e) => [x, y, e],
  back: (x, y, e) => [e, x, y],
  mix: (x, y, e) => pickOne([[x, e, y], [y, e, x]]),
};

const threeGame = makeChoiceGame({
  key: 'three',
  background: 'forest-base',
  levels: [['front'], ['back'], ['mix']],
  build({ range: [order] }) {
    const x = randInt(1, MAX_DIGIT);
    const y = 10 - x;
    const e = randInt(1, MAX_DIGIT);
    const sum = 10 + e;
    return {
      answer: sum,
      options: nearChoices(sum, MIN_SUM, 19),
      scene: bigText(`${ORDERS[order](x, y, e).join(' + ')} = ?`),
      prompt: T.THREE_PROMPT,
      hintText: T.threeHint(x, y, e, sum),
    };
  },
});

export const FOREST_GAMES = Object.freeze({ fill10: fill10Game, acorn: acornGame, three: threeGame });
