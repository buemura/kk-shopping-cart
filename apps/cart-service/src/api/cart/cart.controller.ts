import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetUserCartUsecase } from '@app/cart';
import { Cart } from '@domain/cart/entities/cart';
import {
  AddItemPresentation,
  RemoveItemPresentation,
} from '@presentation/cart';
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
    private readonly removeItemPresentation: RemoveItemPresentation,
  ) {}

  @Get('users/:userId/carts')
  @ApiOkResponse({
    type: SwaggerCartResponse,
    isArray: true,
  })
  async getCartsByUserId(@Param('userId') userId: string): Promise<Cart> {
    try {
      const res = await this.getUserCartUsecase.execute(userId, true);
      return res;
    } catch (error) {
      throw new HttpException(error.message, error.httpStatusCode);
    }
  }

  @Post('users/:userId/carts')
  @ApiOkResponse({
    type: SwaggerAddProductResponse,
  })
  async addProduct(
    @Param('userId') userId: string,
    @Body() addCartProductDto: AddCartItemDto,
  ): Promise<Cart> {
    try {
      const { productId, price, quantity } = addCartProductDto;
      const res = await this.addItemPresentation.handle({
        userId,
        productId,
        price,
        quantity,
      });
      return res;
    } catch (error) {
      throw new HttpException(error.message, error.httpStatusCode);
    }
  }

  @Delete('users/:userId/carts/:cartId/product/:productId')
  @HttpCode(204)
  @ApiNoContentResponse()
  async removeProduct(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    try {
      await this.removeItemPresentation.execute(cartId, productId);
    } catch (error) {
      throw new HttpException(error.message, error.httpStatusCode);
    }
  }
}
