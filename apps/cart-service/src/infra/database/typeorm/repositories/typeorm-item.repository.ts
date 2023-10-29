import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Item } from '@domain/item/entities';
import { ItemRepository } from '@domain/item/repositories';
import { TypeOrmItem } from '../entities';

@Injectable()
export class TypeOrmItemRepository implements ItemRepository {
  private repository: Repository<TypeOrmItem>;

  constructor(
    @Inject('TYPEORM_CONNECTION')
    private readonly conn: DataSource,
  ) {
    this.repository = this.conn.getRepository(TypeOrmItem);
  }

  async findByCartAndItem(cartId: string, productId: string): Promise<Item> {
    return this.repository.findOne({
      where: {
        productId,
        cart: { id: cartId },
      },
    });
  }

  async save(item: Item): Promise<Item> {
    return this.repository.save(item);
  }
}
