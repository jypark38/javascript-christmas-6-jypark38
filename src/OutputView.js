import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  printMenu(menuList) {
    Console.print('<주문 메뉴>');
    menuList.forEach(item => Console.print(item));
    Console.print('');
  },
  // ...

  printPrice(prompt, price) {
    Console.print(prompt);
    Console.print(`${price.toLocaleString()}원\n`);
  },

  printPresent(present) {
    const message = present.discount ? '샴페인 1개' : '없음';
    Console.print('<증정 메뉴>');
    Console.print(`${message}\n`);
  },

  printBenefits(benefit) {
    Console.print('<혜택 내역>');
    const filterdBenefit = benefit.filter(item => item.discount);
    if (!filterdBenefit.length) return Console.print('없음');
    filterdBenefit.forEach(item => this.printBenefit(item));
    Console.print('');
  },

  printBenefit(benefit) {
    const message = `${benefit.topic}: -${benefit.discount.toLocaleString()}원`;
    Console.print(message);
  },

  printBadge(badge) {
    Console.print('<12월 이벤트 배지>');
    Console.print(badge);
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;
