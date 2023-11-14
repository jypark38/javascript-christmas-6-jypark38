import { MENU_TYPE, OFF } from '../lib/constants.js';
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

export default Benefit;
