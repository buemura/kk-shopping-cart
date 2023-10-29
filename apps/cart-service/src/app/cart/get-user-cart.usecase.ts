import { Injectable } from '@nestjs/common';

import { Cart } from '@domain/cart/entities/cart';
import { CartRepository } from '@domain/cart/repositories';

@Injectable()
export class GetUserCartUsecase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string): Promise<Cart> {
    return this.cartRepository.findByUserId(userId);
  }
}
