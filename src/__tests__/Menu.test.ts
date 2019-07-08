import { Menu } from 'rofix';
import AppMenu from '../Menu';

jest.mock('rofix');

describe('AppMenu', () => {
  beforeEach(() => {
    Menu.mockClear();
  });

  it('should not crash', () => {
    const appMenu = new AppMenu();

    expect(appMenu).toBeInstanceOf(AppMenu);
  });

  it('should handle `getOption` WITHOUT error', async () => {
    const expectedResponse = 'test_webhook';
    const payload = { stdout: expectedResponse };
    Menu.mockImplementation(() => {
      return {
        open: () => Promise.resolve(JSON.stringify(payload)),
      };
    });

    const appMenu = new AppMenu();
    const [err, res] = await appMenu.getOption();

    expect(res).toEqual(expectedResponse);
  });

  it('should handle `getOption` WITH error', async () => {
    const expectedError = 'Error';
    Menu.mockImplementation(() => {
      return {
        open: () => Promise.reject(expectedError),
      };
    });

    const appMenu = new AppMenu();
    const [err, res] = await appMenu.getOption();

    expect(err).toEqual(expectedError);
  });
});
