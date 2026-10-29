// 시장 마을 게임 3종: 시계 맞추기, 동전 세기, 물건 사기
import { h, art } from '@공통/widgets/dom.js';
import { randInt, pickOne } from '@공통/games/logic.js';
import { makeChoiceGame, withDistractors } from '../choice.js';
import { bigText, column } from '../visuals.js';
import { analogClock, coin, coinRow } from '../visuals4.js';
import * as T from '../../audio/step4Script.js';

const HOURS = 12;
const wrapHour = (hr) => ((hr - 1 + HOURS) % HOURS) + 1;
const digital = (hr, min) => `${hr}:${min === 30 ? '30' : '00'}`;

/** 시계 보기 글자: 헷갈리는 시각(앞뒤 시, 정각/반) */
function clockChoices(hr, min) {
  const answer = digital(hr, min);
  const other = min === 30 ? 0 : 30;
  const wrong = [digital(wrapHour(hr + 1), min), digital(wrapHour(hr - 1), min), digital(hr, other)];
  return withDistractors(answer, wrong);
}

const clockGame = makeChoiceGame({
  key: 'clock',
  wide: true,
  background: 'market-base',
  levels: [['read'], ['set'], ['half']],
  build({ range: [mode] }) {
    const hr = randInt(1, HOURS);
    if (mode === 'set') {
      let ctx = null;
      const clock = analogClock(wrapHour(hr + randInt(2, 9)), 0, { onSet: (picked) => ctx?.run.answer(picked === hr) });
      return {
        answer: hr,
        options: [],
        scene: column(bigText(digital(hr, 0)), clock.el),
        setup: (c) => { ctx = c; },
        prompt: T.CLOCK_SET_PROMPT,
        hintText: T.clockHint(hr, 0),
      };
    }
    const min = mode === 'half' ? 30 : 0;
    const extra = mode === 'half' ? [h('div', { class: 's4-act' }, pickOne(T.ACTIVITIES))] : [];
    return {
      answer: digital(hr, min),
      options: clockChoices(hr, min),
      scene: column(analogClock(hr, min).el, ...extra),
      prompt: mode === 'half' ? T.CLOCK_HALF_PROMPT : T.CLOCK_READ_PROMPT,
      hintText: T.clockHint(hr, min),
    };
  },
});

const TEN = 10;
const FIFTY = 50;
const HUNDRED = 100;

/** 합(10원 단위)을 동전으로 나눈다. maxKind: 쓸 수 있는 가장 큰 동전 */
function makeCoins(sum, maxKind) {
  const coins = [];
  let rest = sum;
  if (maxKind >= HUNDRED && rest === HUNDRED && Math.random() < 0.5) return [HUNDRED];
  if (maxKind >= FIFTY && rest >= FIFTY && Math.random() < 0.8) {
    coins.push(FIFTY);
    rest -= FIFTY;
    if (maxKind >= HUNDRED && rest >= FIFTY && Math.random() < 0.5) {
      coins.push(FIFTY);
      rest -= FIFTY;
    }
  }
  while (rest > 0) {
    coins.push(TEN);
    rest -= TEN;
  }
  return coins;
}

const coinsGame = makeChoiceGame({
  key: 'coins',
  background: 'market-base',
  levels: [[TEN, 20, 90], [FIFTY, 20, 90], [HUNDRED, 30, 100]],
  build({ range: [maxKind, lo, hi] }) {
    const sum = randInt(lo / 10, hi / 10) * 10;
    const coins = makeCoins(sum, maxKind);
    return {
      answer: sum,
      options: withDistractors(sum, [sum - 10, sum + 10, sum - 20, sum + 20], 10, HUNDRED),
      scene: coinRow(coins),
      prompt: T.COIN_PROMPT,
      hintText: T.coinHint(coins),
    };
  },
});

const GOODS = ['fruit-apple', 'fruit-banana', 'fruit-orange', 'fruit-grape', 'fruit-strawberry', 'fruit-peach'];
const KINDS = [HUNDRED, FIFTY, TEN];

/** 가격을 낼 가장 쉬운 방법: [[동전, 개수], ...] */
function exactCoins(price, trayKinds) {
  let rest = price;
  return KINDS.filter((k) => trayKinds.includes(k)).map((k) => {
    const n = Math.floor(rest / k);
    rest -= n * k;
    return [k, n];
  }).filter(([, n]) => n > 0);
}

const buyGame = makeChoiceGame({
  key: 'buy',
  background: 'market-base',
  levels: [[TEN, 20, 50], [FIFTY, 20, 90], [HUNDRED, 30, 100]],
  build({ range: [maxKind, lo, hi] }) {
    const price = randInt(lo / 10, hi / 10) * 10;
    const trayKinds = KINDS.filter((k) => k <= maxKind);
    const paid = h('div', { class: 's4-paid' }, '0원');
    const tray = h('div', { class: 's4-tray' }, trayKinds.map((k) => coin(k, 'button')));
    const scene = h('div', { class: 's4-buy' },
      h('div', { class: 's4-price' }, art('prop', pickOne(GOODS)), h('b', { class: 's4-tag' }, `${price}원`)),
      h('div', { class: 's4-bottom' }, paid, tray));
    return {
      answer: price,
      options: [],
      scene,
      setup: ({ run }) => {
        let total = 0;
        tray.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', async () => {
          run.poke();
          if (run.state.busy) return;
          total += Number(btn.dataset.value);
          paid.textContent = `${total}원`;
          if (total < price) return;
          const right = total === price;
          if (!right) total = 0;
          const result = await run.answer(right);
          if (result !== 'right') paid.textContent = '0원';
        }));
      },
      prompt: T.BUY_PROMPT,
      hintText: T.buyHint(price, exactCoins(price, trayKinds)),
    };
  },
});

export const MARKET_GAMES = Object.freeze({ clock: clockGame, coins: coinsGame, buy: buyGame });
