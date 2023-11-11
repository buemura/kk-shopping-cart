import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';

@Module({
  imports: [HttpModule],
  controllers: [CartController],
})
export class CartModule {}
