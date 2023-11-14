import { MENU_PRICE, MENU_TYPE } from '../lib/constants.js';
import { ERROR } from '../lib/error.js';

class OrderValidator {
  constructor(order) {
    this.orderFormat(order);
    this.userOrder = order.split(',').map(item => item.split('-')[0]);
    this.userOrderNum = order.split(',').map(item => item.split('-')[1]);
  }

  // menu : 메뉴-1,메뉴-2,...
  orderFormat(order) {
    const pattern = /^([가-힣\s]+-\d+,)*([[가-힣\s]+-\d+)$/;
    if (!pattern.test(order)) throw new Error(ERROR.invalidOrder);
  }

  orderValid() {
    const userOrder = this.userOrder;
    const menuList = Object.keys(MENU_PRICE);
    if (!userOrder.every(item => menuList.includes(item)))
      throw new Error(ERROR.invalidOrder);
    if (userOrder.length !== new Set(userOrder).size)
      throw new Error(ERROR.invalidOrder);
  }

  onlyBeverage() {
    const userOrder = this.userOrder;
    const beverageList = Object.keys(MENU_TYPE['beverage']);
    if (userOrder.every(item => beverageList.includes(item)))
      throw new Error(ERROR.invalidOrder);
  }

  orderNumber() {
    const userOrderNum = this.userOrderNum;
    const totalNum = userOrderNum.reduce((acc, curr) => acc + Number(curr), 0);
    if (totalNum > 20) throw new Error(ERROR.invalidTotalRange);
  }
}

export default OrderValidator;
