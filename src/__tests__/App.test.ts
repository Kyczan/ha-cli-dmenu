import App from '../App';

describe('App', () => {
  it('should not crash', () => {
    const app = new App();

    expect(app).toBeInstanceOf(App);
  });
});
