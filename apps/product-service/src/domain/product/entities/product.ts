import { randomUUID } from 'crypto';
import { ICreateProductIn } from '@domain/product/interfaces';

export class Product {
  id: string;
  name: string;
  price: number;

  constructor(input: ICreateProductIn) {
    this.id = randomUUID();
    this.name = input.name;
    this.price = input.price;
  }
}
