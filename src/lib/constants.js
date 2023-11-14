import { deepFreeze } from './utils.js';

const MENU = {
  appetizer: { 양송이수프: 6000, 타파스: 5500, 시저샐러드: 8000 },
  main: {
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000,
  },
  dessert: { 초코케이크: 15000, 아이스크림: 5000 },
  beverage: { 제로콜라: 3000, 레드와인: 60000, 샴페인: 25000 },
};

deepFreeze(MENU);

export const MENU_PRICE = Object.assign({}, ...Object.values(MENU));

export const MENU_TYPE = Object.keys(MENU).reduce((acc, category) => {
  acc[category] = Object.keys(MENU[category]);
  return acc;
}, {});

export const OFF = Object.freeze({
  // 2일부터 25일까지 100원씩 누적됨
  christmas: 1000,
  weekly: 2023,
  special: 1000,
});

export const BADGE = Object.freeze({
  santa: '산타',
  tree: '트리',
  star: '별',
});
