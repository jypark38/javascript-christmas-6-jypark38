import InputView from './InputView.js';
import { INPUT_PROMPTS, PROMPTS } from './lib/prompt.js';
// import { globalErrorHandler } from './lib/utils.js';
import OutputView from './OutputView.js';
import { ERROR } from './lib/logs.js';
import { MENU_PRICE, MENU_TYPE, OFF } from './lib/constants.js';

export class Controller {
  constructor() {
    //View
    this.inputView = InputView;
    this.outputView = OutputView;

    //Model
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

  run() {
    this.outputView.printMenu(this.menu.menuList);

    const totalPrice = this.menu.totalPrice; // number
    const present = this.benefit.getPresent(totalPrice);
    const benefitArray = this.generateBenefitArray(present);
    const totalbenefit = this.calculateTotalBenefit(benefitArray);
    const badge = this.benefit.getBadge(totalbenefit);

    this.outputView.printPrice('<할인 전 총주문 금액>', totalPrice);
    this.outputView.printPresent(present);
    this.outputView.printBenefits(benefitArray);
    this.outputView.printPrice('<총혜택 금액>', -totalbenefit);
    this.outputView.printPrice(
      '<할인 후 예상 결제 금액>',
      totalPrice - totalbenefit + present.discount,
    );
    this.outputView.printBadge(badge);
  }

  generateBenefitArray(present) {
    const christmas = this.benefit.christmas;
    const weeklyOff = this.benefit.getWeeklyOff(this.menu.data);
    const special = this.benefit.special;

    return [christmas, weeklyOff, special, present];
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
    this.#menu = menu.split(',');
  }
  #validate(menu) {
    if (!/^([가-힣\s]+-\d+,)*([[가-힣\s]+-\d+)$/.test(menu))
      throw new Error(ERROR.invalidOrder);
  }

  get data() {
    return this.#menu.map(item => item.split('-'));
  }

  get menuList() {
    return this.#menu
      .map(item => item.split('-'))
      .map(item => `${item[0]} ${item[1]}개`);
  }

  get totalPrice() {
    return this.#menu
      .map(item => item.split('-'))
      .reduce((acc, curr) => acc + MENU_PRICE[curr[0]] * curr[1], 0);
  }
}

class Benefit {
  #date;
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

  getWeeklyOff(menuData) {
    const isWeekend = (this.#date - 1) % 7 <= 1;
    const discountType = isWeekend ? '주말 할인' : '평일 할인';
    const discountObject = this.initDiscount(discountType);

    const filterFunction = item => {
      return MENU_TYPE[isWeekend ? 'main' : 'dessert'].includes(item[0]);
    };
    const offList = menuData.filter(filterFunction).map(item => item[1]); //.map(item => item[1]);
    discountObject.discount = offList.reduce(
      (acc, curr) => acc + curr * OFF.weekly,
      0,
    );
    return discountObject;
  }

  getPresent(totalPrice) {
    const discountObject = this.initDiscount('증정 이벤트');
    if (totalPrice >= 120000) discountObject.discount = 25000;
    return discountObject;
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

  get christmas() {
    const discountObject = this.initDiscount('크리스마스 디데이 할인');
    if (this.#date <= 25)
      discountObject.discount = OFF.christmas + (this.#date - 1) * 100;
    return discountObject;
  }

  get special() {
    const discountObject = this.initDiscount('특별 할인');
    if ([3, 10, 17, 24, 25, 31].includes(this.#date))
      discountObject.discount = 1000;
    return discountObject;
  }
}
