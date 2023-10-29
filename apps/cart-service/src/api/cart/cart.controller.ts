import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetUserCartUsecase } from '@app/cart';
import { Cart } from '@domain/cart/entities/cart';
import { AddItemPresentation } from '@presentation/cart';
import {
  SwaggerAddProductResponse,
  SwaggerCartResponse,
} from '../../swagger-cart';
import { AddCartItemDto } from './dtos/add-cart-item.dto';

@ApiTags('carts')
@Controller()
export class CartController {
  constructor(
    private readonly getUserCartUsecase: GetUserCartUsecase,
    private readonly addItemPresentation: AddItemPresentation,
  ) {}

  @Get('users/:userId/carts')
  @ApiOkResponse({
    type: SwaggerCartResponse,
    isArray: true,
  })
  async getCartsByUserId(@Param('userId') userId: string): Promise<Cart> {
    return this.getUserCartUsecase.execute(userId);
  }

  @Post('users/:userId/carts')
  @ApiOkResponse({
    type: SwaggerAddProductResponse,
  })
  async addProduct(
    @Param('userId') userId: string,
    @Body() addCartProductDto: AddCartItemDto,
  ): Promise<Cart> {
    const { productId, price, quantity } = addCartProductDto;
    return this.addItemPresentation.handle({
      userId,
      productId,
      price,
      quantity,
    });
  }

  // @Delete('users/:userId/carts/:cartId/products/:productId')
  // @HttpCode(204)
  // @ApiNoContentResponse()
  // async removeProduct(
  //   @Param('cartId') cartId: string,
  //   @Param('productId') productId: string,
  // ) {
  //   return this.cartsService.removeProduct(cartId, productId);
  // }
}
