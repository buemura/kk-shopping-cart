import { Cart } from '@domain/cart/entities/cart';
import { Item } from '@domain/item/entities';

export interface IFullCartOut extends Cart {
  items: Item[];
}

export interface IGetCartOptions {
  include: {
    items: boolean;
  };
}
