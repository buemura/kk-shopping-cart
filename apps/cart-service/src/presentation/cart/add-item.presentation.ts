import { Injectable } from '@nestjs/common';

import {
  CreateCartUsecase,
  GetUserCartUsecase,
  UpdateCartUsecase,
} from '@app/cart';
import { AddItemUsecase } from '@app/item';
import { Cart } from '@domain/cart/entities/cart';
import { IAddItemPresentationIn } from '@domain/item/interfaces';

@Injectable()
export class AddItemPresentation {
  constructor(
    private readonly getUserCartUsecase: GetUserCartUsecase,
    private readonly createCartUsecase: CreateCartUsecase,
    private readonly updateCartUsecase: UpdateCartUsecase,
    private readonly addItemUsecase: AddItemUsecase,
  ) {}

  async handle(props: IAddItemPresentationIn): Promise<Cart> {
    const { userId, productId, price, quantity } = props;

    let cart: Cart;

    cart = await this.getUserCartUsecase.execute(userId);
    if (!cart) {
      cart = await this.createCartUsecase.execute(userId);
    }

    await this.addItemUsecase.execute({
      cartId: cart.id,
      productId,
      price,
      quantity,
    });

    cart.totalPrice += price;
    cart.totalQuantity += quantity;

    return this.updateCartUsecase.execute(cart);
  }
}
