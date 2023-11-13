import InputView from './InputView.js';
import { INPUT_PROMPTS, PROMPTS } from './lib/prompt.js';
// import { globalErrorHandler } from './lib/utils.js';
import OutputView from './OutputView.js';
// import { Console } from '@woowacourse/mission-utils';
import { ERROR } from './lib/logs.js';
import { MENU_PRICE, MENU_TYPE, OFF } from './lib/constants.js';

export class Controller {
  constructor() {
    this.inputView = InputView;
    this.outputView = OutputView;
    this.menu;
    this.benefit;
  }

  async inputDate() {
    try {
      const date = await this.inputView.userInput(INPUT_PROMPTS.date);
      this.benefit = new Benefit(date);
    } catch (error) {
      this.outputView.printError(error.message);
      await this.inputDate();
    }
  }

  async inputMenu() {
    try {
      const menu = await this.inputView.userInput(INPUT_PROMPTS.menu);
      this.menu = new Menu(menu);
    } catch (error) {
      this.outputView.printError(error.message);
      await this.inputMenu();
    }
  }

  evaluate() {
    this.outputView.printMenu(this.menu.menuList);
    const totalPrice = this.menu.totalPrice; // number
    this.outputView.printPrice('<할인 전 총주문 금액>', totalPrice);
    const present = this.benefit.getPresent(totalPrice);
    this.outputView.printPresent(present);
    const benefitArray = this.generateBenefitArray(present);
    this.outputView.printBenefits(benefitArray);
    const totalbenefit = this.calculateTotalBenefit(benefitArray);
    this.outputView.printPrice('<총혜택 금액>', -totalbenefit);
    this.outputView.printPrice(
      '<할인 후 예상 결제 금액>',
      totalPrice - totalbenefit + present.discount,
    );
    const badge = this.benefit.getBadge(totalbenefit);
    this.outputView.printBadge(badge);
  }

  generateBenefitArray(present) {
    const christmas = this.benefit.christmas;
    const dayOff = this.benefit.getDayOff(this.menu.data);
    const weekendOff = this.benefit.getWeekendOff(this.menu.data);
    const special = this.benefit.special;

    return [christmas, dayOff, weekendOff, special, present];
  }

  calculateTotalBenefit(benefitArray) {
    return benefitArray.reduce((acc, curr) => acc + curr.discount, 0);
  }
}

// Model

class Menu {
  #menu;
  constructor(menu) {
    this.#validate(menu);
    this.#menu = menu.split(',').map(item => item.split('-'));
  }
  #validate(menu) {
    if (!/^([가-힣\s]+-\d+,)*([[가-힣\s]+-\d+)$/.test(menu))
      throw new Error(ERROR.invalidOrder);
  }

  get data() {
    return this.#menu;
  }

  get menuList() {
    return this.#menu.map(item => `${item[0]} ${item[1]}개`);
  }

  get totalPrice() {
    return this.#menu.reduce(
      (acc, curr) => acc + MENU_PRICE[curr[0]] * curr[1],
      0,
    );
  }
}

class Benefit {
  #date;
  // this.christmas;
  // this.weekly;
  // this.special;
  // this.presentation;
  // this.badge;
  constructor(date) {
    this.#validate(date);
    this.#date = Number(date); //number
  }

  #validate(date) {
    if (!/^\d+$/.test(date)) throw new Error(ERROR.invalidDate);
    if (Number(date) < 1 || Number(date) > 31)
      throw new Error(ERROR.invalidDate);
  }

  initDiscount(topic) {
    return {
      topic,
      discount: 0,
    };
  }

  get christmas() {
    const returnObj = this.initDiscount('크리스마스 디데이 할인');
    if (this.#date <= 25)
      returnObj.discount = OFF.christmas + (this.#date - 1) * 100;
    return returnObj;
  }

  calculateDiscount(menuData, discountType) {
    const returnObj = this.initDiscount(discountType);
    const filterFunction = item => {
      const type = (this.#date - 1) % 7 <= 1 ? 'main' : 'dessert';

      if (type === 'main' && discountType === '평일 할인') return;
      if (type === 'dessert' && discountType === '주말 할인') return;
      return MENU_TYPE[type].includes(item[0]);
    };

    const offList = menuData.filter(filterFunction).map(item => item[1]); //.map(item => item[1]);

    returnObj.discount = offList.reduce(
      (acc, curr) => acc + curr * OFF.weekly,
      0,
    );

    return returnObj;
  }

  getDayOff(menuData) {
    return this.calculateDiscount(menuData, '평일 할인');
  }

  getWeekendOff(menuData) {
    return this.calculateDiscount(menuData, '주말 할인');
  }

  get special() {
    const returnObj = this.initDiscount('특별 할인');
    if ([3, 10, 17, 24, 25, 31].includes(this.#date)) returnObj.discount = 1000;
    return returnObj;
  }

  getPresent(totalPrice) {
    const returnObj = this.initDiscount('증정 이벤트');
    if (totalPrice >= 120000) returnObj.discount = 25000;
    return returnObj;
  }

  getBadge(totalDiscount) {
    switch (true) {
      case totalDiscount >= 20000:
        return '산타';
      case totalDiscount >= 10000:
        return '트리';
      case totalDiscount >= 5000:
        return '별';
      default:
        return '없음';
    }
  }
}
