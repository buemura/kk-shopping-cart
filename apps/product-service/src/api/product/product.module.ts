import { Module } from '@nestjs/common';

import { CreateProductUsecase } from '@app/product';
import { GetAllProductsUsecase } from '@app/product/get-all-products.usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { ProductController } from './product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [GetAllProductsUsecase, CreateProductUsecase],
})
export class ProductModule {}
