import { Injectable } from '@nestjs/common';

import { Cart } from '@domain/cart/entities/cart';
import { CartRepository } from '@domain/cart/repositories';

@Injectable()
export class UpdateCartUsecase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(cart: Cart): Promise<Cart> {
    return this.cartRepository.save(cart);
  }
}
