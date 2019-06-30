#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

import capitalize from 'capitalize';
import dunst from 'notify-send';
import { Menu } from 'rofix';

import config from './config/config.json';
import sendRequest from './sendRequest';

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

const dmenuRun = async () => {
  const menuArgs = { p: 'Select what to toggle' };
  const menu = new Menu(prepareOptions(), menuArgs);

  try {
    const rawResponse = await menu.open();
    const { stdout } = JSON.parse(rawResponse);
    const selectedWebhook = convertToWebhook(stdout);

    const { status, payload } = await sendRequest(selectedWebhook);
    const dunstUrgency = status === 'ok' ? dunst : dunst.critical;

    dunstUrgency.notify('Home Automation CLI', payload);
    process.exit();
  } catch (error) {
    process.exit();
  }
};

dmenuRun();
