import { Injectable } from '@nestjs/common';

import { GetCartUsecase, UpdateCartUsecase } from '@app/cart';
import { GetProductOnCartUsecase, RemoveItemUsecase } from '@app/item';

@Injectable()
export class RemoveItemPresentation {
  constructor(
    private readonly getCartUsecase: GetCartUsecase,
    private readonly getProductOnCartUsecase: GetProductOnCartUsecase,
    private readonly updateCartUsecase: UpdateCartUsecase,
    private readonly removeItemUsecase: RemoveItemUsecase,
  ) {}

  async execute(cartId: string, productId: string): Promise<void> {
    const cart = await this.getCartUsecase.execute(cartId);
    const item = await this.getProductOnCartUsecase.execute(cart.id, productId);

    cart.totalPrice -= item.price;
    cart.totalQuantity -= item.quantity;

    await this.updateCartUsecase.execute(cart);
    await this.removeItemUsecase.execute(item.id);
  }
}
