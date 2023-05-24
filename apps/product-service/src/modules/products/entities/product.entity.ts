import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    example: '642c82ffb6b68cab00471e47',
    description: 'The product id',
  })
  productId: string;

  @ApiProperty({ example: 243.99, description: 'The product price' })
  price: number;
}
