import Request from '../Request';

describe('Request', () => {
  it('should not crash', () => {
    const request = new Request();

    expect(request).toBeInstanceOf(Request);
  });
});
