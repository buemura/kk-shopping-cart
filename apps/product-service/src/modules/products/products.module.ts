import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../infra/database/database.module';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { ProductsService } from './products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
})
export class ProductsModule {}
