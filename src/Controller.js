import InputView from './view/InputView.js';
import { HEADER, INPUT_PROMPTS, PROMPTS } from './lib/prompt.js';
// import { globalErrorHandler } from './lib/utils.js';
import OutputView from './view/OutputView.js';
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
    this.outputView.printPrice(HEADER.preOff, totalPrice);
    this.outputView.printPresent(HEADER.present, present);
    this.outputView.printBenefits(HEADER.benefit, benefitArray);
    this.outputView.printPrice(
      HEADER.totalBenefit,
      !totalbenefit ? 0 : -totalbenefit,
    );
    this.outputView.printPrice(
      HEADER.postOff,
      totalPrice - totalbenefit + present.discount,
    );
    this.outputView.printBadge(HEADER.badge, badge);
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
