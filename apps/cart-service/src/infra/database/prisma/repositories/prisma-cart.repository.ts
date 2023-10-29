import { Injectable } from '@nestjs/common';

import { Cart } from '@domain/cart/entities/cart';
import { CartRepository } from '@domain/cart/repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Cart> {
    return this.prisma.cart.findFirst({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<Cart> {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: true,
      },
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
