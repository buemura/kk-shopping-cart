import { CartProducts } from '../cart-products.entity';
import { Cart } from '../cart.entity';

describe('Cart Products entity test suite', () => {
  it('should create cart products', () => {
    const cartProduct = new CartProducts({
      productId: 'product-001',
      price: 10,
      quantity: 1,
      cart: new Cart({
        userId: 'user-001',
      }),
    });

    expect(cartProduct).toBeTruthy();
  });
});
