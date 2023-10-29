import { Injectable } from '@nestjs/common';

import { Product } from '@domain/product/entities';
import { ICreateProductIn } from '@domain/product/interfaces';
import { ProductRepository } from '@domain/product/repositories';

@Injectable()
export class CreateProductUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(props: ICreateProductIn) {
    const product = new Product(props);
    return this.productRepository.save(product);
  }
}
