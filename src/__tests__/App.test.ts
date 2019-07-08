import dunst from 'notify-send';
import App from '../App';
import AppMenu from '../Menu';
import AppRequest from '../Request';

jest.mock('notify-send');
jest.mock('../Menu');
jest.mock('../Request');

const mockedDunst = dunst as jest.Mocked<typeof dunst>;
const mockedAppMenu: any = AppMenu as any;
const mockedAppRequest: any = AppRequest as any;

beforeEach(() => {
  mockedAppMenu.mockClear();
  mockedAppRequest.mockClear();
});

describe('App', () => {
  it('should not crash', () => {
    const app = new App();

    expect(app).toBeInstanceOf(App);
  });

  it('should handle `run()` method with happy path', async () => {
    mockedAppMenu.mockImplementation(() => {
      return {
        getOption: () => Promise.resolve([null, 'test_webhook']),
      };
    });
    mockedAppRequest.mockImplementation(() => {
      return {
        sendRequest: () => Promise.resolve([null, { data: 'ok' }]),
      };
    });
    mockedDunst.icon = jest.fn().mockReturnThis();
    mockedDunst.notify = jest.fn().mockReturnThis();

    const app = new App();
    await app.run();

    expect(mockedDunst.notify).toHaveBeenCalledWith(
      'Home Automation CLI',
      'ok',
    );
  });

  it('should handle `run()` method when nothing is selected in menu', async () => {
    mockedAppMenu.mockImplementation(() => {
      return {
        getOption: () => Promise.resolve(['Error', null]),
      };
    });
    mockedDunst.icon = jest.fn().mockReturnThis();
    mockedDunst.notify = jest.fn().mockReturnThis();

    const app = new App();
    await app.run();

    expect(mockedDunst.notify).not.toHaveBeenCalled();
  });

  it('should handle `run()` method when request return error', async () => {
    mockedAppMenu.mockImplementation(() => {
      return {
        getOption: () => Promise.resolve([null, 'test_webhook']),
      };
    });
    mockedAppRequest.mockImplementation(() => {
      return {
        sendRequest: () => Promise.resolve([{ message: 'Error' }, null]),
      };
    });
    mockedDunst.icon = jest.fn().mockReturnThis();
    mockedDunst.notify = jest.fn().mockReturnThis();

    const app = new App();
    await app.run();

    expect(mockedDunst.notify).toHaveBeenCalledWith(
      'Home Automation CLI',
      'Error',
    );
  });
});
