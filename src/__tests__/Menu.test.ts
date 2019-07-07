import Menu from '../Menu';

describe('Menu', () => {
  it('should not crash', () => {
    const menu = new Menu();

    expect(menu).toBeInstanceOf(Menu);
  });
});
