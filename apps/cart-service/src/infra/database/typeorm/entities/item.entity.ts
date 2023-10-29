import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Item } from '@domain/item/entities';
import { ICreateItemIn } from '@domain/item/interfaces';
import { TypeOrmCart } from './cart.entity';

@Entity({ name: 'item' })
export class TypeOrmItem extends Item {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'product_id', nullable: false })
  productId: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'float' })
  price: number;

  @ApiProperty()
  @Column({ nullable: false, type: 'int' })
  quantity: number;

  @ApiProperty()
  @ManyToOne(() => TypeOrmCart, (TypeOrmCart) => TypeOrmCart.items)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'id',
  })
  cart: TypeOrmCart;

  constructor(props: ICreateItemIn) {
    super(props);
  }
}
