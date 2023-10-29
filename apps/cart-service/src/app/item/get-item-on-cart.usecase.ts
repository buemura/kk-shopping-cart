import { Injectable } from '@nestjs/common';

import { Item } from '@domain/item/entities';
import { ItemNotFoundError } from '@domain/item/errors';
import { ItemRepository } from '@domain/item/repositories';

@Injectable()
export class GetProductOnCartUsecase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(cartId: string, productId: string): Promise<Item> {
    const item = await this.itemRepository.findByCartAndProduct(
      cartId,
      productId,
    );
    if (!item) {
      throw new ItemNotFoundError();
    }

    return item;
  }
}
