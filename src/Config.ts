import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

import path from 'path';

class Config {
  public static apiKey: string = process.env.API_KEY || '';
  public static dunstIconPath: string = path.join(
    __dirname,
    './assets/switch.png',
  );

  public static webhooks: string[] = [
    'bedroom_on',
    'bedroom_off',
    'bedroom_lamp_on',
    'bedroom_lamp_off',
    'hall_on',
    'hall_off',
    'kitchen_on',
    'kitchen_off',
    'wc_on',
    'wc_off',
    'living_on',
    'living_off',
  ];
}

export default Config;
