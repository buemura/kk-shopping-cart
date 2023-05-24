import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

type Props = {
  productId: string;
  price: number;
  quantity: number;
  cart: Cart;
};

@Entity({ name: 'cart_products' })
export class CartProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', nullable: false })
  productId: string;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false, type: 'int' })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.products)
  @JoinColumn({
    name: 'shopping_cart_id',
    referencedColumnName: 'shoppingCartId',
  })
  cart: Cart;

  constructor(props: Props) {
    if (!props) {
      return;
    }

    this.productId = props.productId;
    this.price = props.price;
    this.quantity = props.quantity;
    this.cart = props.cart;
  }
}
