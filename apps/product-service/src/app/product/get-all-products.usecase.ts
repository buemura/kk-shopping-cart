import { Injectable } from '@nestjs/common';

import { Product } from '@domain/product/entities/product';
import { ProductRepository } from '@domain/product/repositories';

@Injectable()
export class GetAllProductsUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findMany();
  }
}
