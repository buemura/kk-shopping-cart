import { Item } from '@domain/item/entities';
import { ApiProperty } from '@nestjs/swagger';

export class SwaggerCartResponse {
  @ApiProperty({
    example: '71743e67-2445-49ba-b6f7-f7173e61c1cd',
    description: 'The shopping cart id',
  })
  id: string;

  @ApiProperty({
    example: 'user-001',
    description: 'The user id',
  })
  userId: string;

  @ApiProperty({
    example: 25.99,
    description: 'Cart total price',
  })
  totalPrice: number;

  @ApiProperty({
    example: 2,
    description: 'Cart total products quantity',
  })
  totalQuantity: number;

  @ApiProperty({
    example: [
      { productId: '642c82ffb6b68cab00471e47', price: 20.0, quantity: 1 },
      { productId: '642c82ffb6b68cab00471e48', price: 5.99, quantity: 1 },
    ],
    description: 'Products on cart',
  })
  items: Item[];

  @ApiProperty({
    example: new Date(),
    description: 'Created date',
  })
  createdAt: string;

  @ApiProperty({
    example: new Date(),
    description: 'Updated date',
  })
  updatedAt: string;
}

export class SwaggerAddProductResponse {
  @ApiProperty({
    example: '71743e67-2445-49ba-b6f7-f7173e61c1cd',
    description: 'The shopping cart id',
  })
  shoppingCartId: string;
}
