import { Cart } from '@domain/cart/entities/cart';
import { IGetCartOptions } from '@domain/cart/interfaces';

export abstract class CartRepository {
  abstract findById(
    id: string,
    options?: IGetCartOptions,
  ): Promise<Cart> | Cart;
  abstract findByUserId(
    userId: string,
    options?: IGetCartOptions,
  ): Promise<Cart> | Cart;
  abstract save(cart: Cart): Promise<Cart> | Cart;
}
