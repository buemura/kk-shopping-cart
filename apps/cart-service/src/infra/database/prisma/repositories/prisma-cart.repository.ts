import { Injectable } from '@nestjs/common';

import { Cart } from '@domain/cart/entities/cart';
import { IGetCartOptions } from '@domain/cart/interfaces';
import { CartRepository } from '@domain/cart/repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string, options?: IGetCartOptions): Promise<Cart> {
    let include = {};

    if (options?.include) {
      include = options.include;
    }

    return this.prisma.cart.findFirst({
      where: { id },
      include,
    });
  }

  async findByUserId(userId: string, options?: IGetCartOptions): Promise<Cart> {
    let include = {};

    if (options?.include) {
      include = options.include;
    }

    return this.prisma.cart.findFirst({
      where: { userId },
      include,
    });
  }

  async save(cart: Cart): Promise<Cart> {
    return this.prisma.cart.upsert({
      where: { id: cart.id },
      create: cart,
      update: cart,
      include: {
        items: true,
      },
    });
  }
}
