import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Product } from '@domain/product/entities';
import { ProductRepository } from '@domain/product/repositories';
import { ProductDocument } from '../interfaces';

@Injectable()
export class MongoProductRepository implements ProductRepository {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly model: Model<ProductDocument>,
  ) {}

  async findMany(): Promise<Product[]> {
    return this.model.find().exec();
  }

  async save(product: Product): Promise<Product> {
    return this.model.create(product);
  }
}
