# ha-cli-dmenu

[![Build Status](https://travis-ci.com/Kyczan/ha-cli-dmenu.svg?branch=master)](https://travis-ci.com/Kyczan/ha-cli-dmenu)
[![codecov](https://codecov.io/gh/Kyczan/ha-cli-dmenu/branch/master/graph/badge.svg)](https://codecov.io/gh/Kyczan/ha-cli-dmenu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

home automation CLI

![Notification](./scroots/dunst.png)

## what

This project is a simple wrapper for IFTTT which connects to SONOFF devices and allows to control them via CLI.

Also this is [dmenu](https://wiki.archlinux.org/index.php/dmenu) (more precisely: [rofi](https://wiki.archlinux.org/index.php/Rofi)) version of [ha-cli](https://github.com/Kyczan/ha-cli)

## why

To control SONOFF devices there is only app for phone ([eWeLink](http://www.ewelink.cc/en/)). This project allows you to control via CLI.

## how

### prerequisites

1. First create account on [IFTTT](https://ifttt.com).

2. Next turn on [webhooks](https://ifttt.com/maker_webhooks) in IFTTT.

3. Then configure your applets in [IFTTT](https://ifttt.com/create). Search for `webhooks` when creating `this` statement and search `ewelink` when creating `that` statement (in my case I selected "Turn 1 Channel Switch on or off").

4. To obtain webhook url go to [IFTTT webhooks](https://ifttt.com/maker_webhooks) and click `Documentation`.

5. Test connection with presented url and as `{event}` use event name created in step 4. You should be able to switch on/off the light when executing this url.

### dependencies

- nodejs
- rofi
- dmenu
- dunst
- xclip

### installation

Clone repository and cd into:

```sh
git clone https://github.com/Kyczan/ha-cli-dmenu.git
cd ha-cli
```

Next grab your API key [here](https://ifttt.com/services/maker_webhooks/settings). Save this in `.env` file in root directory of this project (or use existing `.env.example` file):
   
```sh
API_KEY="your_api_key"
```

Then adjust `config.json` file in `src/config` dir accordingly to your `{events}` values.

And finally install this package globally by typing in terminal:

```sh
sudo npm install -g
```

Now you have command `ha-cli-dmenu` available across all terminals.

### usage

Open terminal, type `ha-cli-dmenu`, and pick option to switch.

Also, as a good practice, it is worth to create keybinding to run `ha-cli-dmenu`, so you can run this from anywhere in your system. Example keybinding is created in my fork of [dwm](https://github.com/Kyczan/dwm) (search `config.h` file for `ha-cli-dmenu`).
