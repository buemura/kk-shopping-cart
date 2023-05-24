import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CartsService } from './carts.service';
import { AddCartProductDto } from './dto/add-cart-product.dto';
import {
  SwaggerAddProductResponse,
  SwaggerCartResponse,
} from './interfaces/swagger-cart';
@ApiTags('carts')
@Controller()
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('users/:userId/carts')
  @ApiResponse({
    status: 200,
    description: 'Get Carts by User Id',
    type: SwaggerCartResponse,
    isArray: true,
  })
  async getCartsByUserId(@Param('userId') userId: string) {
    return this.cartsService.getCartsByUserId(userId);
  }

  @Get('users/:userId/carts/:cartId')
  @ApiResponse({
    status: 200,
    description: 'Get Carts by Cart Id',
    type: SwaggerCartResponse,
  })
  async getCartById(
    @Param('userId') userId: string,
    @Param('cartId') cartId: string,
  ) {
    return this.cartsService.getCartById(userId, cartId);
  }

  @Post('users/:userId/carts/:cartId')
  @ApiResponse({
    status: 200,
    description: 'Add product to cart',
    type: SwaggerAddProductResponse,
  })
  @ValidateNested()
  @Type(() => AddCartProductDto)
  async addProduct(
    @Param('userId') userId: string,
    @Param('cartId') cartId: string,
    @Body() addCartProductDto: AddCartProductDto,
  ) {
    const { productId, price, quantity } = addCartProductDto;
    return this.cartsService.addProduct(userId, cartId, {
      productId,
      price,
      quantity,
    });
  }

  @Delete('users/:userId/carts/:cartId/products/:productId')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Removes a product from a cart',
  })
  async removeProduct(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartsService.removeProduct(cartId, productId);
  }
}
