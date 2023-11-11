import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetUserCartUsecase } from '@app/cart';
import { Cart } from '@domain/cart/entities/cart';
import {
  AddItemPresentation,
  RemoveItemPresentation,
} from '@presentation/cart';
import {
  AddCartItemDto,
  SwaggerAddProductResponse,
  SwaggerCartResponse,
  UserCartQueryDto,
} from './dtos';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(
    private readonly getUserCartUsecase: GetUserCartUsecase,
    private readonly addItemPresentation: AddItemPresentation,
    private readonly removeItemPresentation: RemoveItemPresentation,
  ) {}

  @Get()
  @ApiOkResponse({
    type: SwaggerCartResponse,
    isArray: true,
  })
  async getCartsByUserId(@Query() { userId }: UserCartQueryDto): Promise<Cart> {
    try {
      const res = await this.getUserCartUsecase.execute(userId, true);
      return res;
    } catch (error) {
      throw new HttpException(error.message, error.httpStatusCode);
    }
  }

  @Post()
  @ApiOkResponse({
    type: SwaggerAddProductResponse,
  })
  async addProduct(
    @Query() { userId }: UserCartQueryDto,
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

  @Delete(':cartId/products/:productId')
  @HttpCode(204)
  @ApiNoContentResponse()
  async removeProduct(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Query() { userId }: UserCartQueryDto,
  ): Promise<void> {
    try {
      await this.removeItemPresentation.execute(cartId, productId);
    } catch (error) {
      throw new HttpException(error.message, error.httpStatusCode);
    }
  }
}
