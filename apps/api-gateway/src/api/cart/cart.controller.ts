import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';

import { AddCartItemDto, CartDto, UserCartQueryDto } from './dtos';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  @ApiOkResponse({ type: CartDto })
  async getCartItem(@Query() query: UserCartQueryDto): Promise<CartDto> {
    const { userId } = query;
    const { data } = await firstValueFrom<{ data: CartDto }>(
      this.httpService.get(
        `${this.configService.getOrThrow(
          'CART_SERVICE',
        )}/carts?userId=${userId}`,
      ),
    );

    return plainToInstance(CartDto, data);
  }

  @Post()
  @ApiOkResponse({ type: CartDto })
  async addCartItem(
    @Query() query: UserCartQueryDto,
    @Body() body: AddCartItemDto,
  ): Promise<CartDto> {
    const { userId } = query;
    const { data } = await firstValueFrom<{ data: CartDto }>(
      this.httpService.post(
        `${this.configService.getOrThrow(
          'CART_SERVICE',
        )}/carts?userId=${userId}`,
        {
          ...body,
          userId,
        },
      ),
    );

    return plainToInstance(CartDto, data);
  }

  @Delete(':cartId/product/:productId')
  @ApiOkResponse({ type: CartDto })
  async deleteCartItem(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Query() query: UserCartQueryDto,
  ): Promise<CartDto> {
    const { userId } = query;
    const { data } = await firstValueFrom<{ data: CartDto }>(
      this.httpService.delete(
        `${this.configService.getOrThrow(
          'CART_SERVICE',
        )}/carts/${cartId}/products/${productId}?userId=${userId}`,
      ),
    );
    return plainToInstance(CartDto, data);
  }
}
