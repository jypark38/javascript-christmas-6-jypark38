import { Controller } from './Controller.js';
import { PROMPTS } from './lib/prompt.js';
class App {
  async run() {
    const controller = new Controller();

    controller.intro();
    await controller.inputDate();
    await controller.inputMenu();

    const resultObj = controller.evaluateResult();
    controller.printResult(resultObj);
  }
}

export default App;
