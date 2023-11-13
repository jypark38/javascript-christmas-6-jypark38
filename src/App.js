import { Controller } from './Controller.js';
import { PROMPTS } from './lib/prompt.js';
class App {
  async run() {
    const controller = new Controller();
    controller.outputView.printMessage(PROMPTS.intro);
    await controller.inputDate();
    await controller.inputMenu();
    controller.outputView.printMessage(PROMPTS.preview);
    controller.run();
  }
}

export default App;
