import { Injectable } from '@nestjs/common';

import { ItemRepository } from '@domain/item/repositories';

@Injectable()
export class RemoveItemUsecase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(itemId: string): Promise<void> {
    await this.itemRepository.remove(itemId);
  }
}
