import dunst from 'notify-send';

import Config from './Config';
import AppMenu from './Menu';
import AppRequest from './Request';

class App {
  private appMenu = new AppMenu();
  private appRequest = new AppRequest();

  public run = async (): Promise<void> => {
    // show rofi dmenu to choose webhook
    const [menuErr, selectedWebhook] = await this.appMenu.getOption();

    if (menuErr) {
      // nothing was selected
      return;
    }

    // send request to IFTTT server
    const [respErr, payload] = await this.appRequest.sendRequest(
      selectedWebhook,
    );

    // show dunst notification
    const dunstUrgency = (respErr && dunst.critical) || dunst;
    const message = (respErr && respErr.message) || (payload && payload.data);
    dunstUrgency
      .icon(Config.dunstIconPath)
      .notify('Home Automation CLI', message);

    // process.exit();
    return;
  };
}

export default App;
