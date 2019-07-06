#!/usr/bin/env node

import axios from 'axios';
import capitalize from 'capitalize';
import dunst from 'notify-send';
import path from 'path';
import { Menu } from 'rofix';

import { config } from './config/config';

const prepareOptions = () => {
  const { webhooks } = config;
  return webhooks.map(str => capitalize.words(str.split('_').join(' ')));
};

const convertToWebhook = (selectedOption: any) => {
  return selectedOption
    .toLowerCase()
    .split(' ')
    .join('_');
};

const getUrl = (value: string) =>
  `https://maker.ifttt.com/trigger/${value}/with/key/${config.apiKey}`;

const sendRequest = async (webhook: string) => {
  try {
    await axios.get(getUrl(webhook));
    return {
      payload: 'Congratulations! Request has been successfully sent.',
      status: 'ok',
    };
  } catch (error) {
    return { status: 'error', payload: error.message };
  }
};

const dmenuRun = async () => {
  const iconPath: string = path.join(__dirname, './assets/switch.png');
  const menuArgs = { p: 'Select what to toggle' };
  const menu = new Menu(prepareOptions(), menuArgs);

  try {
    const rawResponse = await menu.open();
    const { stdout } = JSON.parse(rawResponse);
    const selectedWebhook = convertToWebhook(stdout);

    const { status, payload } = await sendRequest(selectedWebhook);
    const dunstUrgency = status === 'ok' ? dunst : dunst.critical;

    dunstUrgency.icon(iconPath).notify('Home Automation CLI', payload);
    process.exit();
  } catch (error) {
    process.exit();
  }
};

dmenuRun();
