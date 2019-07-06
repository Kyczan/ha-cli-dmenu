import to from 'await-to-js';
import capitalize from 'capitalize';
import { Menu } from 'rofix';

import Config from './Config';

class AppMenu {
  public getOption = async (): Promise<any[]> => {
    const menuArgs = { p: 'Select what to toggle' };
    const menu = new Menu(this.prepareOptions(), menuArgs);
    const [err, rawResponse] = await to(menu.open());
    let response = '';

    if (!err) {
      const { stdout } = JSON.parse(rawResponse);
      response = this.convertToWebhook(stdout);
    }

    return [err, response];
  };

  private prepareOptions = (): string[] => {
    const { webhooks } = Config;
    return webhooks.map(str => capitalize.words(str.split('_').join(' ')));
  };

  private convertToWebhook = (selectedOption: string): string => {
    return selectedOption
      .toLowerCase()
      .split(' ')
      .join('_');
  };
}

export default AppMenu;
