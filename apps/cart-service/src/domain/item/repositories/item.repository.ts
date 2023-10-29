import { Item } from '../entities';

export abstract class ItemRepository {
  abstract findById(id: string): Promise<Item> | Item;
  abstract findByCartAndProduct(
    cartId: string,
    productId: string,
  ): Promise<Item> | Item;
  abstract save(item: Item): Promise<Item> | Item;
  abstract remove(itemId: string): Promise<void>;
}
