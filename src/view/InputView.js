import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async userInput(prompt) {
    const input = await Console.readLineAsync(prompt);
    return input;
  },
};

export default InputView;
