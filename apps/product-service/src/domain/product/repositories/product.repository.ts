import { Product } from '@domain/product/entities';

export abstract class ProductRepository {
  abstract findMany(): Promise<Product[]> | Product[];
  abstract save(product: Product): Promise<Product> | Product;
}
