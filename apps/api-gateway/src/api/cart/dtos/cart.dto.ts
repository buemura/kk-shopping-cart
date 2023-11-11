import { Cart, Item } from '@domain/cart/entities';
import { ApiProperty } from '@nestjs/swagger';

class ItemDto extends Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  cartId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}

export class CartDto extends Cart {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  totalQuantity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  items: ItemDto[];
}
