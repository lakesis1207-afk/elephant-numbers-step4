// 4단계 게임이 할 수 있는 모든 말 → 녹음 목록. 문장은 step4Script.js에서 만든다 (같은 문장은 한 번만).
import * as T from './step4Script.js';
import { nativeCount } from '@공통/games/numbers.js';

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const MAX_DIGIT = 9;
const group = '4단계 게임';
const line = (id, text) => ({ group, id, text });

const FIXED = {
  'bunch-q': T.BUNCH_PROMPT, 'bunch-hint': T.bunchHint(), 'group-q': T.GROUP_PROMPT, 'group-hint': T.groupHint(),
  'board-q': T.BOARD_PROMPT, 'board-hint-any': T.BOARD_ANY_HINT,
  'board-hint-next': T.boardNextHint(1, 2), 'board-hint-prev': T.boardNextHint(2, 1),
  'board-hint-down': T.boardTenHint(1, 11), 'board-hint-up': T.boardTenHint(11, 1),
  'fill10-q': T.FILL10_PROMPT, 'eq-q': T.EQ_PROMPT, 'acorn-q': T.ACORN_PIC_PROMPT, 'three-q': T.THREE_PROMPT, 'three-hint': T.threeHint(),
  'numline-q': T.NUMLINE_PROMPT, 'numline-hint': T.NUMLINE_HINT, 'blank-pic-hint': T.BLANK_PIC_HINT, 'fish-q': T.FISH_PIC_PROMPT, 'blank-q': T.BLANK_PROMPT,
  'skip-q': T.SKIP_PROMPT, 'skip-hint-10': T.skipHint(10), 'skip-hint-5': T.skipHint(5), 'skip-hint-2': T.skipHint(2),
  'evenodd-pic-q': T.EVEN_PIC_PROMPT, 'evenodd-num-q': T.EVEN_NUM_PROMPT, 'even-hint': T.EVEN_HINT, 'odd-hint': T.ODD_HINT,
  'clock-read-q': T.CLOCK_READ_PROMPT, 'clock-set-q': T.CLOCK_SET_PROMPT, 'clock-half-q': T.CLOCK_HALF_PROMPT,
  'coin-q': T.COIN_PROMPT, 'coin-hint': T.coinHint(), 'buy-q': T.BUY_PROMPT, 'buy-hint': T.buyHint(),
};

/** 받아올림: a + b ≥ 11 (둘 다 한 자리) */
const carryLines = () =>
  range(2, MAX_DIGIT).flatMap((a) => range(Math.max(2, 11 - a), MAX_DIGIT).map((b) => line(`carry-${a}-${b}`, T.carryHint(a, b))));

/** 받아내림: 전체 11~19에서 b를 빼면 일의 자리가 모자라고 남는 수는 2 이상 */
const borrowLines = () =>
  range(11, 19).flatMap((total) =>
    range((total % 10) + 1, Math.min(MAX_DIGIT, total - 2)).map((b) => line(`borrow-${total}-${b}`, T.borrowHint(total, b))));

const blankLines = () =>
  range(2, MAX_DIGIT).flatMap((a) => range(Math.max(2, 11 - a), MAX_DIGIT).map((b) => line(`blank-${a}-${a + b}`, T.blankHint(a, a + b))));

const storyLines = () =>
  T.STORIES.flat().flatMap(([text, a, b, op], i) => [line(`story-${i}`, text), line(`story-hint-${i}`, T.storyHint(a, b, op))]);

const clockLines = () =>
  range(1, 12).flatMap((h) => [0, 30].map((m) => line(`clock-hint-${h}-${m}`, T.clockHint(h, m))));

/** 묶음을 눌러 셀 때 읽는 수 (열, 스물 … 아흔아홉, 백) */
const countLines = () => [...range(11, 99).map((n) => line(`nc-${n}`, nativeCount(n))), line('nc-100', '백')];

export function step4VoiceLines() {
  const all = [
    ...Object.entries(FIXED).map(([id, text]) => line(id, text)),
    ...carryLines(), ...borrowLines(), ...blankLines(), ...storyLines(), ...clockLines(), ...countLines(),
  ];
  const seen = new Set();
  return all.filter((l) => !seen.has(l.text) && seen.add(l.text));
}
