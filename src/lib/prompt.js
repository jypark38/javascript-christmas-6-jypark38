// import { deepFreeze } from './utils';

export const INPUT_PROMPTS = Object.freeze({
  date: `12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
  menu: `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n`,
});

export const PROMPTS = Object.freeze({
  intro: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  preview: '12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n',
});

export const HEADER = Object.freeze({
  order: '<주문 메뉴>',
  preOff: '<할인 전 총주문 금액>',
  present: '<증정 메뉴>',
  benefit: '<혜택 내역>',
  totalBenefit: '<총혜택 금액>',
  postOff: '<할인 후 예상 결제 금액>',
  badge: '<12월 이벤트 배지>',
});

export const BENEFIT_LIST = Object.freeze({
  christmas: '크리스마스 디데이 할인',
  special: '특별 할인',
  present: '증정 이벤트',
  day: '평일 할인',
  weekend: '주말 할인',
});
