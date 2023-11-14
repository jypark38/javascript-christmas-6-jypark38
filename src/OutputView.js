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

  printPresent(prompt, present) {
    const message = present.discount ? '샴페인 1개' : '없음';
    Console.print(prompt);
    Console.print(`${message}\n`);
  },

  printBenefits(prompt, benefit) {
    Console.print(prompt);
    if (!benefit.length) return Console.print(`없음\n`);

    benefit.forEach(item => this.printBenefit(item));
    Console.print('');
  },

  printBenefit(benefit) {
    Console.print(`${benefit.topic}: ${benefit.discount.toLocaleString()}원`);
  },

  printBadge(prompt, badge) {
    Console.print(prompt);
    Console.print(badge);
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;
