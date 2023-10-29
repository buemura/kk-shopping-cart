import { Document } from 'mongoose';

import { Product } from '@domain/product/entities';

export interface ProductDocument extends Document, Product {
  id: string;
  name: string;
  price: number;
}
