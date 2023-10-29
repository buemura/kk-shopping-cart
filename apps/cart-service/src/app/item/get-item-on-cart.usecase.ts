import { Injectable } from '@nestjs/common';

import { Item } from '@domain/item/entities';
import { ItemRepository } from '@domain/item/repositories';

@Injectable()
export class GetItemOnCartUsecase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(cartId: string, productId: string): Promise<Item> {
    return this.itemRepository.findByCartAndItem(cartId, productId);
  }
}
