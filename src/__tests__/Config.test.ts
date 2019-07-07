// need to empty process.env.API_KEY
jest.mock('dotenv');
import Config from '../Config';

describe('Config', () => {
  it('should not crash', () => {
    const config = new Config();

    expect(config).toBeInstanceOf(Config);
  });

  it('should have proper `apiKey` value', () => {
    expect(Config.apiKey).toEqual('');
  });
});
