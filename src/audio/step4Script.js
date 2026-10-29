// 4단계 게임 대사 모음. 게임(src/games)은 여기 있는 문장만 쓴다.
// 녹음을 줄이려고: 문제 말에는 숫자를 넣지 않고(숫자는 화면에 보임), 풀이 말(hint)만 숫자를 넣은 통문장이다.
import { cnt, josa, isIt } from '../games/say.js';
import { nativeAdj } from '@공통/games/numbers.js';

const iga = (n) => `${n}${josa(n, '이', '가')}`;

// ---- 사바나: 100까지 수 ----
export const BUNCH_PROMPT = '바나나가 모두 몇 개일까? 묶음부터 눌러서 세어 봐!';
export const BUNCH_HINT = '열 개 묶음이 몇 개인지 세고, 낱개를 더해 봐!';
export const bunchHint = () => BUNCH_HINT;
export const GROUP_PROMPT = '낱개를 눌러서 열 개를 모아 묶어 봐! 그다음 모두 몇 개인지 맞혀 봐!';
export const groupHint = () => `낱개 열 개를 묶으면 묶음 하나가 돼! ${BUNCH_HINT}`;
export const BOARD_PROMPT = '숫자판의 물음표 칸에 들어갈 수는?';
export const boardNextHint = (mark, ask) => (ask > mark ? '바로 다음 칸은 하나 큰 수야!' : '바로 앞 칸은 하나 작은 수야!');
export const boardTenHint = (mark, ask) => (ask > mark ? '바로 아래 칸은 10 큰 수야!' : '바로 위 칸은 10 작은 수야!');
export const BOARD_ANY_HINT = '앞뒤 칸과 위아래 칸을 잘 봐!';

// ---- 숲속: 받아올림 더하기 ----
export const FILL10_PROMPT = '먼저 열 칸을 채우고, 남은 도토리를 더해서 모두 몇 개인지 맞혀 봐!';
export const EQ_PROMPT = '식을 풀어 봐! 열을 먼저 만들면 쉬워.';
export const ACORN_PIC_PROMPT = '도토리를 모두 합치면 몇 개일까?';
export const carryHint = (a, b) => {
  const need = 10 - a;
  const rest = b - need;
  return `${a}에 ${need}${josa(need, '을', '를')} 주면 10, ${iga(rest)} 남아서 ${isIt(a + b)}!`;
};
export const THREE_PROMPT = '세 수를 더해 봐! 합이 열이 되는 짝꿍을 먼저 찾으면 쉬워.';
export const threeHint = () => '합이 열인 짝꿍을 먼저 더하고, 남은 수를 더해!';

// ---- 바닷가: 받아내림 빼기 ----
export const NUMLINE_PROMPT = '펭귄이 뒤로 폴짝폴짝 뛰어요! 눌러서 뛰어 보고, 도착한 곳을 골라 봐!';
export const NUMLINE_HINT = '펭귄을 따라 한 칸씩 뒤로 뛰어 봐! 도착한 곳이 답이야.';
export const borrowHint = (total, b) => {
  const first = total - 10;
  return `${total}에서 10까지 ${cnt(first, '칸')} 뛰고, ${cnt(b - first, '칸')} 더 뛰면 ${isIt(total - b)}!`;
};
export const FISH_PIC_PROMPT = '물고기가 헤엄쳐 가고 나면 몇 마리 남을까?';
export const BLANK_PROMPT = '저울이 한쪽으로 기울었어! 양쪽이 똑같아지려면 왼쪽에 몇 개를 더 올려야 할까?';
export const BLANK_PIC_HINT = '왼쪽에 조개를 올려 보자! 양쪽이 똑같아지면 저울이 평평해져.';
export const blankHint = (a, sum) => {
  const need = 10 - a;
  const rest = sum - 10;
  return `${a}에서 10까지 ${need}, 10에서 ${sum}까지 ${rest}, 합치면 ${isIt(need + rest)}!`;
};

// ---- 공룡: 순서·짝수 홀수 ----
export const SKIP_PROMPT = '발자국을 따라 뛰어 세어 보자! 물음표 자리에 들어갈 수는?';
export const skipHint = (step) => `${step}씩 뛰어 세면 수가 ${step}씩 커져!`;
export const EVEN_PIC_PROMPT = '공룡 알을 둘씩 짝 지어 봐! 짝수일까 홀수일까?';
export const EVEN_NUM_PROMPT = '이 수는 짝수일까 홀수일까?';
export const EVEN_HINT = '둘씩 짝을 지으면 남는 게 없어서 짝수야!';
export const ODD_HINT = '둘씩 짝을 지으면 하나가 남아서 홀수야!';
/** 이야기 문제: [이야기, 앞의 수, 뒤의 수, '+'|'-']. 단계마다 6개 (숫자가 들어가서 문장째 녹음) */
export const STORIES = Object.freeze([
  [
    ['티라노가 색종이를 12장 가지고 있어요. 스테고가 8장을 더 주었어요. 모두 몇 장일까요?', 12, 8, '+'],
    ['브라키오가 도토리를 9개 주웠어요. 프테라가 5개를 더 주웠어요. 도토리는 모두 몇 개일까요?', 9, 5, '+'],
    ['티라노가 공룡알을 7개 찾았어요. 스테고가 6개를 더 찾았어요. 공룡알은 모두 몇 개일까요?', 7, 6, '+'],
    ['프테라가 열매를 8개 땄어요. 브라키오가 7개를 더 땄어요. 열매는 모두 몇 개일까요?', 8, 7, '+'],
    ['스테고가 조개를 9개 주웠어요. 티라노가 9개를 더 주웠어요. 조개는 모두 몇 개일까요?', 9, 9, '+'],
    ['브라키오가 풍선을 11개 가지고 있어요. 프테라가 5개를 더 주었어요. 풍선은 모두 몇 개일까요?', 11, 5, '+'],
  ],
  [
    ['스테고가 열매를 15개 땄어요. 7개를 먹었어요. 열매는 몇 개 남았을까요?', 15, 7, '-'],
    ['티라노가 색종이를 13장 가지고 있어요. 6장을 친구에게 주었어요. 색종이는 몇 장 남았을까요?', 13, 6, '-'],
    ['브라키오가 도토리를 12개 주웠어요. 5개를 잃어버렸어요. 도토리는 몇 개 남았을까요?', 12, 5, '-'],
    ['프테라가 풍선을 14개 불었어요. 9개가 터졌어요. 풍선은 몇 개 남았을까요?', 14, 9, '-'],
    ['티라노가 공룡알을 18개 지키고 있어요. 9개가 깨어났어요. 공룡알은 몇 개 남았을까요?', 18, 9, '-'],
    ['스테고가 조개를 12개 모았어요. 8개를 바다에 돌려보냈어요. 조개는 몇 개 남았을까요?', 12, 8, '-'],
  ],
  [
    ['브라키오가 나뭇잎을 9개 먹었어요. 조금 뒤에 6개를 더 먹었어요. 나뭇잎을 모두 몇 개 먹었을까요?', 9, 6, '+'],
    ['티라노가 사과를 16개 가지고 있어요. 8개를 친구들과 나눠 먹었어요. 사과는 몇 개 남았을까요?', 16, 8, '-'],
    ['프테라가 물고기를 8마리 잡았어요. 티라노가 5마리를 잡았어요. 둘이 잡은 물고기는 모두 몇 마리일까요?', 8, 5, '+'],
    ['브라키오가 꽃을 17송이 꺾었어요. 9송이를 꽃병에 꽂았어요. 꽃병에 꽂지 않은 꽃은 몇 송이일까요?', 17, 9, '-'],
    ['스테고가 돌멩이를 14개 모았어요. 6개를 더 모았어요. 돌멩이는 모두 몇 개일까요?', 14, 6, '+'],
    ['프테라가 구슬을 13개 가지고 있었어요. 4개를 잃어버렸어요. 구슬은 몇 개 남았을까요?', 13, 4, '-'],
  ],
]);
export const storyAnswer = (a, b, op) => (op === '+' ? a + b : a - b);
export const storyHint = (a, b, op) =>
  op === '+' ? `${a} 더하기 ${b}, 모두 합치면 답은 ${a + b}!` : `${a} 빼기 ${b}, 덜어 내면 답은 ${a - b}!`;

// ---- 시장: 시계·돈 ----
export const timeWord = (h, m) => `${nativeAdj(h)} 시${m === 30 ? ' 반' : ' 정각'}`;
export const CLOCK_READ_PROMPT = '시계 바늘을 보고 맞는 시각을 골라 봐!';
export const CLOCK_SET_PROMPT = '짧은 바늘을 돌려서 시계를 맞춰 봐!';
export const CLOCK_HALF_PROMPT = '하루 일과 시각이야! 시계를 보고 맞는 시각을 골라 봐!';
export const clockHint = (h, m) =>
  m === 30
    ? `긴 바늘이 6을 가리키면 반이야! ${timeWord(h, 30)}!`
    : `긴 바늘이 12를 가리키고 짧은 바늘이 ${h}${josa(h, '을', '를')} 가리키니까 ${timeWord(h, 0)}이야!`;
export const ACTIVITIES = Object.freeze(['아침을 먹어요', '학교에 가요', '점심을 먹어요', '간식을 먹어요', '책을 읽어요', '잠을 자요']);
export const COIN_PROMPT = '동전을 모두 합치면 얼마일까?';
export const COIN_HINT = '동전을 하나씩 차례로 더해 봐! 큰 동전부터 세면 쉬워.';
export const coinHint = () => COIN_HINT;
export const BUY_PROMPT = '가격표를 보고 딱 맞게 동전을 내 봐!';
export const buyHint = () => '가격표만큼 되게 큰 동전부터 내 봐!';
