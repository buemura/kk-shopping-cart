import { Injectable } from '@nestjs/common';

import { Item } from '@domain/item/entities';
import { ICreateItemIn } from '@domain/item/interfaces';
import { ItemRepository } from '@domain/item/repositories';

@Injectable()
export class AddItemUsecase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(props: ICreateItemIn): Promise<Item> {
    const cartItem = await this.itemRepository.findByCartAndProduct(
      props.cartId,
      props.productId,
    );

    let item: Item;

    if (cartItem) {
      cartItem.price += props.price;
      cartItem.quantity += props.quantity;
      item = cartItem;
    } else {
      item = new Item({
        cartId: props.cartId,
        productId: props.productId,
        price: props.price,
        quantity: props.quantity,
      });
    }

    return this.itemRepository.save(item);
  }
}
