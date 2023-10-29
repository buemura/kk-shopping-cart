import { Injectable } from '@nestjs/common';

import { Item } from '@domain/item/entities';
import { ItemRepository } from '@domain/item/repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaItemRepository implements ItemRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Item> {
    return this.prisma.item.findFirst({
      where: { id },
    });
  }

  async findByCartAndProduct(cartId: string, productId: string): Promise<Item> {
    return this.prisma.item.findFirst({
      where: {
        cartId,
        productId,
      },
    });
  }

  async save(item: Item): Promise<Item> {
    return this.prisma.item.upsert({
      where: { id: item.id },
      create: item,
      update: item,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.item.delete({
      where: { id },
    });
  }
}
