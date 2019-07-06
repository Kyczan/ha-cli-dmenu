import to from 'await-to-js';
import axios, { AxiosResponse } from 'axios';

import Config from './Config';

type sendRequestType = (
  webhook: string,
) => Promise<[Error | null, AxiosResponse<any> | undefined]>;

class AppRequest {
  public sendRequest: sendRequestType = async webhook => {
    return await to(axios.get(this.getUrl(webhook)));
  };

  private getUrl = (value: string): string =>
    `https://maker.ifttt.com/trigger/${value}/with/key/${Config.apiKey}`;
}

export default AppRequest;
