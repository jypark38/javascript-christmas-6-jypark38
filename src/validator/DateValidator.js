import { ERROR } from '../lib/error.js';

class DateValidator {
  static dateFormat(date) {
    if (!/^\d+$/.test(date)) throw new Error(ERROR.invalidDate);
  }
  static dateRange(date) {
    if (date < 1 || date > 31) throw new Error(ERROR.invalidDate);
  }
}

export default DateValidator;
