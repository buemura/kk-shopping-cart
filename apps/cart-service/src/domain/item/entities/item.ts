import { randomUUID } from 'crypto';
import { ICreateItemIn } from '../interfaces';

export class Item {
  id: string;
  cartId: string;
  productId: string;
  price: number;
  quantity: number;

  constructor(props: ICreateItemIn) {
    if (!props) {
      return;
    }

    this.id = randomUUID();
    this.cartId = props.cartId;
    this.productId = props.productId;
    this.price = props.price;
    this.quantity = props.quantity;
  }
}
