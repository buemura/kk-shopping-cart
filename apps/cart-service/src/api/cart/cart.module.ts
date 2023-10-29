import { Module } from '@nestjs/common';

import {
  CreateCartUsecase,
  GetCartUsecase,
  GetUserCartUsecase,
  UpdateCartUsecase,
} from '@app/cart';
import {
  AddItemUsecase,
  GetProductOnCartUsecase,
  RemoveItemUsecase,
} from '@app/item';
import { DatabaseModule } from '@infra/database';
import {
  AddItemPresentation,
  RemoveItemPresentation,
} from '@presentation/cart';
import { CartController } from './cart.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [
    GetCartUsecase,
    GetUserCartUsecase,
    GetProductOnCartUsecase,
    CreateCartUsecase,
    UpdateCartUsecase,
    AddItemUsecase,
    RemoveItemUsecase,
    AddItemPresentation,
    RemoveItemPresentation,
  ],
})
export class CartModule {}
