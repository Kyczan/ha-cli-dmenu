import axios from 'axios';
import Request from '../Request';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Request', () => {
  it('should not crash', () => {
    const request = new Request();

    expect(request).toBeInstanceOf(Request);
  });

  it('should handle `sendRequest` call', async () => {
    const expectedResponse = { status: 'ok' };
    mockedAxios.get.mockResolvedValue(expectedResponse);

    const request = new Request();
    const [err, res] = await request.sendRequest('test');

    expect(res).toEqual(expectedResponse);
  });
});
