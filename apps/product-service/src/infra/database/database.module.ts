import { Module } from '@nestjs/common';
import mongoose from 'mongoose';

import { ProductRepository } from '@domain/product/repositories';
import { ProductModel } from './mongo/models';
import { MongoProductRepository } from './mongo/repositories';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: () => mongoose.connect(process.env.DATABASE_URL),
    },
    {
      provide: 'PRODUCT_MODEL',
      useValue: ProductModel,
    },
    {
      provide: ProductRepository,
      useClass: MongoProductRepository,
    },
  ],
  exports: [ProductRepository],
})
export class DatabaseModule {}
