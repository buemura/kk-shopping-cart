import { ICreateItemIn } from '../interfaces';

export class Item {
  id: string;
  productId: string;
  price: number;
  quantity: number;

  constructor(props: ICreateItemIn) {
    if (!props) {
      return;
    }

    this.productId = props.productId;
    this.price = props.price;
    this.quantity = props.quantity;
  }
}
