import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Cart } from '@domain/cart/entities/cart';
import { ICreateCartIn } from '@domain/cart/interfaces';
import { TypeOrmItem } from './item.entity';

@Entity({ name: 'carts' })
export class TypeOrmCart extends Cart {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty()
  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @ApiProperty()
  @Column({ name: 'total_price', type: 'float', default: 0.0 })
  totalPrice: number;

  @ApiProperty()
  @Column({ name: 'total_quantity', type: 'int', default: 0 })
  totalQuantity: number;

  @ApiProperty()
  @OneToMany(() => TypeOrmItem, (item) => item.cart)
  items: TypeOrmItem[];

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  constructor(props: ICreateCartIn) {
    super(props);
  }
}
