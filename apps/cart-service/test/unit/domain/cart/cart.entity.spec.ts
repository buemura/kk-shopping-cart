import { Cart } from '../../../../src/infra/database/typeorm/entities/cart.entity';

describe('Cart entity test suite', () => {
  it('should create a cart', () => {
    const cart = new Cart({
      userId: 'user-001',
    });
    expect(cart).toBeTruthy();
  });

  it('should increment cart properly', () => {
    const cart = new Cart({
      userId: 'user-001',
    });
    expect(cart.totalPrice).toBe(0);
    expect(cart.totalQuantity).toBe(0);

    cart.incrementTotals(1.99, 1);
    expect(cart.totalPrice).toBe(1.99);
    expect(cart.totalQuantity).toBe(1);

    cart.incrementTotals(10, 2);
    expect(cart.totalPrice).toBe(11.99);
    expect(cart.totalQuantity).toBe(3);
  });

  it('should decrement cart properly', () => {
    const cart = new Cart({
      userId: 'user-001',
    });
    expect(cart.totalPrice).toBe(0);
    expect(cart.totalQuantity).toBe(0);

    cart.incrementTotals(15, 5);
    cart.decrementTotals(10, 2);
    expect(cart.totalPrice).toBe(5);
    expect(cart.totalQuantity).toBe(3);
  });
});
