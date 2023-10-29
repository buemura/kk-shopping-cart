import { Item } from '@domain/item/entities';
import { ICreateCartIn } from '../interfaces';

export class Cart {
  id: string;
  userId: string;
  totalPrice: number;
  totalQuantity: number;
  items: Item[];
  createdAt: string;
  updatedAt: string;

  constructor(props: ICreateCartIn) {
    if (!props) {
      return;
    }

    this.userId = props.userId;
    this.totalPrice = 0;
    this.totalQuantity = 0;
  }

  incrementTotals(totalPrice: number, totalQuantity: number) {
    this.totalPrice += totalPrice;
    this.totalQuantity += totalQuantity;
  }

  decrementTotals(totalPrice: number, totalQuantity: number) {
    this.totalPrice -= totalPrice;
    this.totalQuantity -= totalQuantity;
  }
}
