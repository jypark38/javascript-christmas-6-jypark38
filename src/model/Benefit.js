import { BADGE, MENU_TYPE, OFF } from '../lib/constants.js';
import { BENEFIT_LIST } from '../lib/prompt.js';
import DateValidator from '../validator/DateValidator.js';

class Benefit {
  #date;
  constructor(date) {
    this.#validate(date);
    this.#date = Number(date); //number
  }

  #validate(date) {
    DateValidator.dateFormat(date);
    DateValidator.dateRange(Number(date));
  }

  initDiscount(topic) {
    return {
      topic,
      discount: 0,
    };
  }

  getWeeklyOff(menuData) {
    const isWeekend = (this.#date - 1) % 7 <= 1;
    const discountType = isWeekend ? BENEFIT_LIST.weekend : BENEFIT_LIST.day;
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
    const discountObject = this.initDiscount(BENEFIT_LIST.present);
    if (totalPrice >= 120000) discountObject.discount = 25000;
    return discountObject;
  }

  getBadge(totalDiscount) {
    switch (true) {
      case totalDiscount >= 20000:
        return BADGE.santa;
      case totalDiscount >= 10000:
        return BADGE.tree;
      case totalDiscount >= 5000:
        return BADGE.star;
      default:
        return '없음';
    }
  }

  get christmas() {
    const discountObject = this.initDiscount(BENEFIT_LIST.christmas);
    if (this.#date <= 25)
      discountObject.discount = OFF.christmas + (this.#date - 1) * 100;
    return discountObject;
  }

  get special() {
    const discountObject = this.initDiscount(BENEFIT_LIST.special);
    if ([3, 10, 17, 24, 25, 31].includes(this.#date))
      discountObject.discount = 1000;
    return discountObject;
  }
}

export default Benefit;
