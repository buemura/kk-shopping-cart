import { randomUUID } from 'crypto';

import { ICreateCartIn } from '@domain/cart/interfaces';

export class Cart {
  id: string;
  userId: string;
  totalPrice: number;
  totalQuantity: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: ICreateCartIn) {
    if (!props) {
      return;
    }

    this.id = randomUUID();
    this.userId = props.userId;
    this.totalPrice = 0;
    this.totalQuantity = 0;
  }
}
