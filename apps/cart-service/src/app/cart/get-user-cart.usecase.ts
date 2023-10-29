import { Injectable } from '@nestjs/common';

import { Cart } from '@domain/cart/entities/cart';
import { CartRepository } from '@domain/cart/repositories';

@Injectable()
export class GetUserCartUsecase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string, incluteItems: boolean = false): Promise<Cart> {
    return this.cartRepository.findByUserId(userId, {
      include: {
        items: incluteItems,
      },
    });
  }
}
