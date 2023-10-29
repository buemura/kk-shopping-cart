import { Module } from '@nestjs/common';

import {
  CreateCartUsecase,
  GetUserCartUsecase,
  UpdateCartUsecase,
} from '@app/cart';
import { DatabaseModule } from '@infra/database';
import { AddItemPresentation } from '@presentation/cart';
import { CartController } from './cart.controller';
import { AddItemUsecase } from '@app/item';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [
    GetUserCartUsecase,
    CreateCartUsecase,
    UpdateCartUsecase,
    AddItemUsecase,
    AddItemPresentation,
  ],
})
export class CartModule {}
