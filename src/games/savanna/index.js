// 사바나 마을 게임 3종: 바나나 묶음 세기, 10개 모아 묶기, 100 숫자판 빈칸
import { h, art } from '@공통/widgets/dom.js';
import { randInt } from '@공통/games/logic.js';
import { makeChoiceGame, withDistractors } from '../choice.js';
import { bundles } from '../visuals.js';
import { board100, tapToCountBundles4 } from '../visuals4.js';
import * as T from '../../audio/step4Script.js';

const PROP = 'fruit-banana';
const TEN = 10;
const MIN_BIG = 51;
const MAX_BIG = 100;
const MANY_TENS = 3; // 묶음이 이만큼 이상이면 그림을 작게 (visuals.js와 같은 값)
const many = (n, make) => Array.from({ length: n }, (_, i) => make(i));
const swapDigits = (n) => (n % 10) * 10 + Math.floor(n / 10);

/** 51~100 보기: 정답 + 10 차이·1 차이·자리 바꾼 수 */
const bigChoices = (n) => withDistractors(n, [n - 10, n + 10, n - 1, n + 1, swapDigits(n)], MIN_BIG, MAX_BIG);

const bunchGame = makeChoiceGame({
  key: 'bunch',
  background: 'savanna-base',
  levels: [[51, 70, true], [51, 100, true], [51, 100, false]],
  build({ range: [lo, hi, withPictures], last }) {
    let n = randInt(lo, hi);
    if (n === last) n = randInt(lo, hi);
    const scene = bundles(n, withPictures ? PROP : null);
    return {
      answer: n,
      options: bigChoices(n),
      scene,
      setup: withPictures ? (ctx) => tapToCountBundles4(scene, ctx) : undefined,
      prompt: T.BUNCH_PROMPT,
      hintText: T.bunchHint(n),
    };
  },
});

/** 낱개 열 개를 눌러 모으면 묶음 하나로 바뀐다. 처음엔 묶음 (n/10 − 1)개와 낱개 (10 + 일의 자리)개 */
function groupScene(n, onMerge) {
  const fixed = Math.floor(n / 10) - 1;
  const tenBox = () => h('div', { class: 's3-ten' }, many(TEN, () => art('prop', PROP)));
  const looseBox = h('div', { class: 's3-loose' });
  const items = many(TEN + (n % 10), () => h('button', { class: 's3-one', 'aria-label': '낱개' }, art('prop', PROP)));
  looseBox.append(...items);
  const cls = `s3-bundles s4-group${fixed + 1 >= MANY_TENS ? ' many' : ''}`;
  const row = h('div', { class: cls }, many(fixed, tenBox), looseBox);
  items.forEach((item) => item.addEventListener('click', () => {
    item.classList.toggle('sel');
    const picked = items.filter((it) => it.isConnected && it.classList.contains('sel'));
    if (picked.length < TEN) return;
    picked.forEach((it) => it.remove());
    row.insertBefore(tenBox(), looseBox);
    onMerge();
  }));
  return row;
}

const groupGame = makeChoiceGame({
  key: 'group',
  background: 'savanna-base',
  levels: [[51, 69], [60, 89], [70, 99]],
  build({ range: [lo, hi] }) {
    const n = randInt(lo, hi);
    let sound = null;
    return {
      answer: n,
      options: bigChoices(n),
      scene: groupScene(n, () => sound?.pop()),
      setup: ({ sfx }) => { sound = sfx; },
      prompt: T.GROUP_PROMPT,
      hintText: T.groupHint(n),
    };
  },
});

const MIN_ASK = 12;
const MAX_ASK = 99;

const boardGame = makeChoiceGame({
  key: 'board',
  background: 'savanna-base',
  levels: [['next'], ['ud'], ['any']],
  build({ range: [kind] }) {
    const ask = randInt(MIN_ASK, MAX_ASK);
    const reach = kind === 'ud' ? 10 : 1; // 바로 옆(1) 또는 위아래(10)에 있는 기준 칸
    const dir = ask + reach > MAX_BIG ? -1 : ask - reach < 1 ? 1 : Math.random() < 0.5 ? -1 : 1;
    const mark = kind === 'next' ? ask + dir : kind === 'ud' ? ask + dir * 10 : null;
    const hintText = kind === 'next' ? T.boardNextHint(mark, ask) : kind === 'ud' ? T.boardTenHint(mark, ask) : T.BOARD_ANY_HINT;
    return {
      answer: ask,
      options: withDistractors(ask, [ask - 1, ask + 1, ask - 10, ask + 10], 1, MAX_BIG),
      scene: board100(mark, ask),
      prompt: T.BOARD_PROMPT,
      hintText,
    };
  },
});

export const SAVANNA_GAMES = Object.freeze({ bunch: bunchGame, group: groupGame, board: boardGame });
