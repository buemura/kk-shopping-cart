import { Item } from '../entities';

export abstract class ItemRepository {
  abstract findByCartAndItem(
    cartId: string,
    productId: string,
  ): Promise<Item> | Item;
  abstract save(item: Item): Promise<Item> | Item;
}
