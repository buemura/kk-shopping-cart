import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productsRepository: Model<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsRepository.find().select('-_id').exec();
    return products;
  }
}
