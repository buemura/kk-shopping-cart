import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Cart } from '@domain/cart/entities/cart';
import { CartRepository } from '@domain/cart/repositories';
import { TypeOrmCart } from '../entities';

@Injectable()
export class TypeOrmCartRepository implements CartRepository {
  private repository: Repository<TypeOrmCart>;

  constructor(
    @Inject('TYPEORM_CONNECTION')
    private readonly conn: DataSource,
  ) {
    this.repository = this.conn.getRepository(TypeOrmCart);
  }

  async findById(id: string): Promise<TypeOrmCart> {
    const cart = await this.repository.findOne({
      where: { id },
      relations: {
        items: true,
      },
      select: {
        items: {
          productId: true,
          price: true,
          quantity: true,
        },
      },
    });

    return cart;
  }

  async findByUserId(userId: string): Promise<TypeOrmCart> {
    const cart = await this.repository.findOne({
      where: { userId },
      relations: {
        items: true,
      },
      select: {
        items: {
          productId: true,
          price: true,
          quantity: true,
        },
      },
    });

    return cart;
  }

  async save(cart: Cart): Promise<TypeOrmCart> {
    return this.repository.save(cart);
  }
}
