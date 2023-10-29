import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({
    example: '10530b14-6ea6-47a3-ad03-337cb3dfa9e4',
    description: 'User Id',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: '642cbd0ab77945bab736f9bf',
    description: 'Product Id',
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    example: 10.99,
    description: 'Product price',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 2,
    description: 'Product quantity',
  })
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
