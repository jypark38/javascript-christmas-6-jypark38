import InputView from './InputView.js';
import { INPUT_PROMPTS, PROMPTS } from './lib/prompt.js';
// import { globalErrorHandler } from './lib/utils.js';
import OutputView from './OutputView.js';
import Menu from './model/Menu.js';
import Benefit from './model/Benefit.js';

export class Controller {
  constructor() {
    //View
    this.inputView = InputView;
    this.outputView = OutputView;

    //Model
    this.menu;
    this.benefit;
  }

  intro() {
    this.outputView.printMessage(PROMPTS.intro);
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
      this.outputView.printMessage(PROMPTS.preview);
    } catch (error) {
      this.outputView.printError(error.message);
      await this.inputMenu();
    }
  }

  evaluateResult() {
    this.outputView.printMenu(this.menu.menuList);

    const totalPrice = this.menu.totalPrice; // number
    const present = this.benefit.getPresent(totalPrice);

    const benefitArray = this.generateBenefitArray(present);
    const totalbenefit = this.calculateTotalBenefit(benefitArray);

    const badge = this.benefit.getBadge(totalbenefit);

    return { totalPrice, present, benefitArray, totalbenefit, badge };
  }

  printResult({ totalPrice, present, benefitArray, totalbenefit, badge }) {
    this.outputView.printPrice('<할인 전 총주문 금액>', totalPrice);
    this.outputView.printPresent('<증정 메뉴>', present);
    this.outputView.printBenefits('<혜택 내역>', benefitArray);
    this.outputView.printPrice(
      '<총혜택 금액>',
      !totalbenefit ? 0 : -totalbenefit,
    );
    this.outputView.printPrice(
      '<할인 후 예상 결제 금액>',
      totalPrice - totalbenefit + present.discount,
    );
    this.outputView.printBadge('<12월 이벤트 배지>', badge);
  }

  generateBenefitArray(present) {
    const christmas = this.benefit.christmas;
    const weeklyOff = this.benefit.getWeeklyOff(this.menu.data);
    const special = this.benefit.special;

    return [christmas, weeklyOff, special, present].filter(
      item => item.discount,
    );
  }

  calculateTotalBenefit(benefitArray) {
    return benefitArray.reduce((acc, curr) => acc + curr.discount, 0);
  }
}
