import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

import { ProductRepository } from '@domain/product/repositories';
import { ProductModel } from './mongo/models';
import { MongoProductRepository } from './mongo/repositories';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (configService: ConfigService) =>
        mongoose.connect(configService.getOrThrow<string>('DATABASE_URL')),
      inject: [ConfigService],
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
