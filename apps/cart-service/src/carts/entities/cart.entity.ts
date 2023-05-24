import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartProducts } from './cart-products.entity';

type Props = {
  shoppingCartId?: string;
  userId: string;
};

@Entity({ name: 'carts' })
export class Cart {
  @ApiProperty({
    example: '71743e67-2445-49ba-b6f7-f7173e61c1cd',
    description: 'The shopping cart id',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'shopping_cart_id' })
  shoppingCartId: string;

  @ApiProperty({
    example: 'user-001',
    description: 'The user id',
  })
  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @ApiProperty({
    example: 25.99,
    description: 'Cart total price',
  })
  @Column({ name: 'total_price', type: 'float', default: 0.0 })
  totalPrice: number;

  @ApiProperty({
    example: 2,
    description: 'Cart total products quantity',
  })
  @Column({ name: 'total_quantity', type: 'int', default: 0 })
  totalQuantity: number;

  @ApiProperty({
    example: [
      { productId: '642c82ffb6b68cab00471e47', price: 20.0, quantity: 1 },
      { productId: '642c82ffb6b68cab00471e48', price: 5.99, quantity: 1 },
    ],
    description: 'Products on cart',
  })
  @OneToMany(() => CartProducts, (product) => product.cart)
  products: CartProducts[];

  @ApiProperty({
    example: new Date(),
    description: 'Created date',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty({
    example: new Date(),
    description: 'Updated date',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  constructor(props: Props) {
    if (!props) {
      return;
    }

    if (props.shoppingCartId) {
      this.shoppingCartId = props.shoppingCartId;
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
