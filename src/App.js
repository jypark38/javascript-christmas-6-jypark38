import { Controller } from './Controller.js';
import { PROMPTS } from './lib/prompt.js';
class App {
  async run() {
    const cont = new Controller();
    cont.outputView.printMessage(PROMPTS.intro);
    await cont.inputDate();
    await cont.inputMenu();
    cont.outputView.printMessage(PROMPTS.preview);
    cont.evaluate();
  }
}

export default App;
