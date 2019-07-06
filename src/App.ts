import dunst from 'notify-send';

import config from './config';
import AppMenu from './Menu';
import AppRequest from './Request';

const appMenu = new AppMenu();
const appRequest = new AppRequest();

class App {
  public run = async (): Promise<void> => {
    // show rofi dmenu to choose webhook
    const [menuErr, selectedWebhook] = await appMenu.getOption();

    if (menuErr) {
      // nothing was selected
      process.exit();
    }

    // send request to IFTTT server
    const [respErr, payload] = await appRequest.sendRequest(selectedWebhook);

    // show dunst notification
    const dunstUrgency = (respErr && dunst.critical) || dunst;
    const message = (respErr && respErr.message) || (payload && payload.data);
    dunstUrgency
      .icon(config.dunstIconPath)
      .notify('Home Automation CLI', message);

    process.exit();
  };
}

export default App;
