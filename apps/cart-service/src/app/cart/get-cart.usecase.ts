import { Injectable } from '@nestjs/common';

import { Cart } from '@domain/cart/entities/cart';
import { CartNotFoundError } from '@domain/cart/errors';
import { CartRepository } from '@domain/cart/repositories';

@Injectable()
export class GetCartUsecase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(id: string, incluteItems: boolean = false): Promise<Cart> {
    const cart = await this.cartRepository.findById(id, {
      include: {
        items: incluteItems,
      },
    });

    if (!cart) {
      throw new CartNotFoundError();
    }

    return cart;
  }
}
