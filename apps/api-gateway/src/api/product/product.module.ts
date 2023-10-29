import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
})
export class ProductModule {}
