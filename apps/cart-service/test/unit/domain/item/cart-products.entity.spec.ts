import { Item } from '../../../../src/infra/database/typeorm/entities/item.entity';
import { Cart } from '../../../../src/infra/database/typeorm/entities/cart.entity';

describe('Cart Products entity test suite', () => {
  it('should create cart products', () => {
    const cartProduct = new Item({
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
