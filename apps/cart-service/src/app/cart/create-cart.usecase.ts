import { Injectable } from '@nestjs/common';

import { Cart } from '@domain/cart/entities/cart';
import { CartRepository } from '@domain/cart/repositories';

@Injectable()
export class CreateCartUsecase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string): Promise<Cart> {
    const cart = new Cart({
      userId,
    });

    return this.cartRepository.save(cart);
  }
}
