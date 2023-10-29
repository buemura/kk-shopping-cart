import { Module } from '@nestjs/common';

import { CartRepository } from '@domain/cart/repositories';
import { ItemRepository } from '@domain/item/repositories';
import { PrismaService } from './prisma';
import {
  PrismaCartRepository,
  PrismaItemRepository,
} from './prisma/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: CartRepository,
      useClass: PrismaCartRepository,
    },
    {
      provide: ItemRepository,
      useClass: PrismaItemRepository,
    },
  ],
  exports: [CartRepository, ItemRepository],
})
export class DatabaseModule {}
