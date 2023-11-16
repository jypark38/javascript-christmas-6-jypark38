import { MENU_PRICE } from '../lib/constants.js';
import OrderValidator from '../validator/OrderValidator.js';

class Menu {
  #menu;
  constructor(menu) {
    this.#validate(menu);
    this.#menu = menu.split(',');
  }
  #validate(menu) {
    const validator = new OrderValidator(menu);
    validator.orderValid();
    validator.onlyBeverage();
    validator.orderNumber();
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

export default Menu;
