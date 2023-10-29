import { Cart } from '@domain/cart/entities/cart';

export abstract class CartRepository {
  abstract findById(id: string): Promise<Cart> | Cart;
  abstract findByUserId(userId: string): Promise<Cart> | Cart;
  abstract save(cart: Cart): Promise<Cart> | Cart;
}
