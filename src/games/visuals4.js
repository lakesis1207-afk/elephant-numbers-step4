// 4단계 그림 조각: 수직선, 100 숫자판, 동전, 바늘 시계, 짝 지은 알, 묶음 세기
import { h, art } from '@공통/widgets/dom.js';
import { nativeCount } from '@공통/games/numbers.js';
import { markCount } from '@공통/games/shared/counting.js';
import { bigText, column } from './visuals.js';

const many = (n, make) => Array.from({ length: n }, (_, i) => make(i));

/** 방식(그림만 / 그림과 식 / 식만)에 따라 그림·식을 고른다 */
export const showBy = (mode, picture, equation) =>
  mode === 'pic' ? picture : mode === 'eq' ? bigText(equation) : column(picture, bigText(equation));

/** 펭귄이 뒤로 뛰는 수직선: lo~hi 칸. 칸이나 펭귄을 누르면 한 칸 뒤로 뛴다 (10 칸은 색을 달리한다) */
export function hopLine(lo, hi, start) {
  const ticks = many(hi - lo + 1, (i) => {
    const v = lo + i;
    return h('span', { class: `s4-tick${v === 10 ? ' ten' : ''}` }, h('div', { class: 's4-slot' }), h('b', {}, String(v)), h('i', {}));
  });
  const slotOf = (v) => ticks[v - lo].querySelector('.s4-slot');
  const hopper = art('character', 'penguin', { class: 's4-hopper' });
  let at = start;
  slotOf(start).append(hopper);
  return {
    el: h('div', { class: 's4-line' }, ticks),
    /** 한 칸 뒤로 뛴다. 더 갈 곳이 없으면 false */
    hop() {
      if (at <= lo) return false;
      at -= 1;
      slotOf(at).append(hopper);
      return true;
    },
    reset() {
      at = start;
      slotOf(start).append(hopper);
    },
  };
}

/** 10칸 틀(도토리가 a개 들어 있음)과 낱개 도토리 b개. 낱개를 누르면 빈 칸으로 옮겨 간다 */
export function acornFill(a, b) {
  const cells = many(10, (i) => h('i', { class: 's4-cell' }, i < a ? art('prop', 'acorn') : null));
  const frame = h('div', { class: 's4-fill' }, cells);
  const loose = many(b, () => h('button', { class: 's4-loose', 'aria-label': '도토리' }, art('prop', 'acorn')));
  let sound = null;
  loose.forEach((btn) => btn.addEventListener('click', () => {
    const cell = cells.find((c) => !c.firstChild);
    if (!cell) return;
    btn.remove();
    cell.append(art('prop', 'acorn'));
    sound?.pop();
    if (cells.every((c) => c.firstChild)) frame.classList.add('full');
  }));
  return { frame, loose: h('div', { class: 's4-looserow' }, loose), bind: (sfx) => { sound = sfx; } };
}

/**
 * 저울: 오른쪽 접시에 right개, 왼쪽 접시에 base개. preview(k)로 왼쪽에 k개를 더 올려 본다.
 * mode: pic(조개 그림) | both(그림 + 숫자) | eq(숫자만). 모자라면 오른쪽, 넘치면 왼쪽이 내려가고 같으면 평평하다.
 */
export function balanceScale(base, right, mode) {
  const MAX_TILT = 12;
  const TILT_PER_SHELL = 2.5;
  const shells = (n, cls = '') => many(n, () => art('prop', 'shell', cls ? { class: cls } : {}));
  const leftBox = h('div', { class: 's4-panbox' });
  const rightBox = h('div', { class: 's4-panbox' }, mode === 'eq' ? h('b', { class: 's4-num' }, String(right)) : shells(right));
  const leftCap = h('div', { class: 's4-pancap' });
  const rightCap = h('div', { class: 's4-pancap' }, mode === 'pic' ? '' : String(right));
  const beam = h('div', { class: 's4-beam' },
    h('div', { class: 's4-pan' }, leftBox, leftCap), h('div', { class: 's4-pan' }, rightBox, rightCap));
  const el = h('div', { class: 's4-scale' }, h('div', { class: 's4-stand' }), beam);
  function preview(k = 0) {
    const have = base + k;
    if (mode === 'eq') leftBox.replaceChildren(h('b', { class: 's4-num' }, k ? `${base} + ${k}` : `${base} + ?`));
    else leftBox.replaceChildren(...shells(base), ...shells(k, 'new'), ...(k ? [] : [h('b', { class: 's4-q' }, '?')]));
    leftCap.textContent = mode === 'pic' ? '' : k ? String(have) : `${base} + ?`;
    const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, (right - have) * TILT_PER_SHELL));
    el.style.setProperty('--tilt', `${tilt}deg`);
    el.classList.toggle('level', have === right);
  }
  preview(0);
  return { el, preview };
}

/** 1~100 숫자판. mark는 반짝이는 수, ask는 물음표 칸 */
export const board100 = (mark, ask) =>
  h('div', { class: 's4-board' }, many(100, (i) => {
    const v = i + 1;
    return h('span', { class: v === mark ? 'on' : v === ask ? 'q' : '' }, v === ask ? '?' : String(v));
  }));

/** 알 n개를 둘씩 짝 지어 보여 준다 (홀수면 마지막 하나가 남는다). 많으면 조금 작게 */
export const eggPairs = (n) =>
  h('div', { class: `s4-pairs${n > 10 ? ' small' : ''}` }, many(Math.ceil(n / 2), (i) =>
    h('div', { class: 's4-pair' }, art('prop', 'dino-egg'), i * 2 + 1 < n ? art('prop', 'dino-egg') : h('i', {}))));

/** 동전 하나 (value원). 눌러 쓸 수 있게 button으로 만든다 */
export const coin = (value, tag = 'span') => h(tag, { class: `s4-coin c${value}`, 'data-value': value }, h('b', {}, String(value)), h('small', {}, '원'));
export const coinRow = (values) => h('div', { class: 's4-coins' }, values.map((v) => coin(v)));

const NS = 'http://www.w3.org/2000/svg';
function svg(tag, attrs = {}, ...kids) {
  const el = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  kids.forEach((k) => el.append(k));
  return el;
}

/** 바늘 시계. onSet을 주면 짧은 바늘을 끌어서 돌릴 수 있다 (손을 뗄 때 onSet(시)) */
export function analogClock(hour, minute = 0, { onSet } = {}) {
  const hourHand = svg('line', { x1: 100, y1: 100, x2: 100, y2: 55, class: 'hh' });
  const minuteHand = svg('line', { x1: 100, y1: 100, x2: 100, y2: 30, class: 'mh', transform: `rotate(${minute * 6} 100 100)` });
  const nums = many(12, (i) => {
    const a = ((i + 1) * 30 * Math.PI) / 180;
    const t = svg('text', { x: 100 + 74 * Math.sin(a), y: 100 - 74 * Math.cos(a) + 7, 'text-anchor': 'middle', class: 'cn' });
    t.textContent = String(i + 1);
    return t;
  });
  const el = svg('svg', { viewBox: '0 0 200 200', class: `s4-clock${onSet ? ' live' : ''}`, role: 'img', 'aria-label': '시계' },
    svg('circle', { cx: 100, cy: 100, r: 96, class: 'cf' }), ...nums, hourHand, minuteHand, svg('circle', { cx: 100, cy: 100, r: 5, class: 'cc' }));
  let current = hour;
  const setHour = (hr) => {
    current = hr;
    hourHand.setAttribute('transform', `rotate(${(hr % 12) * 30 + minute * 0.5} 100 100)`);
  };
  setHour(hour);
  if (onSet) {
    let drag = false;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const deg = ((Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI + 360) % 360;
      setHour(Math.round(deg / 30) % 12 || 12);
    };
    el.addEventListener('pointerdown', (e) => { drag = true; el.setPointerCapture?.(e.pointerId); move(e); });
    el.addEventListener('pointermove', (e) => drag && move(e));
    el.addEventListener('pointerup', () => { if (drag) { drag = false; onSet(current); } });
  }
  return { el, setHour };
}

/** 묶음·낱개를 누르면 지금까지 센 수를 붙이고 말한다 (100은 "백") */
export function tapToCountBundles4(scene, { run, say, sfx }) {
  let total = 0;
  scene.querySelectorAll('[data-count]').forEach((item) => {
    item.addEventListener('click', () => {
      run.poke();
      if (item.classList.contains('c') || run.state.busy) return;
      total += Number(item.dataset.count);
      markCount(item, total);
      sfx.pop();
      say(total > 99 ? '백' : nativeCount(total));
    });
  });
}
