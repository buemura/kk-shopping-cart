import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';

import { CreateProductDto } from './dtos/create-product.dto';
import { ProductDto } from './dtos/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [ProductDto] })
  async getProducts(): Promise<ProductDto[]> {
    const { data } = await firstValueFrom<{ data: ProductDto[] }>(
      this.httpService.get(
        `${this.configService.getOrThrow('PRODUCT_SERVICE')}/products`,
      ),
    );

    return data.map((d) => plainToInstance(ProductDto, d));
  }

  @Post()
  @ApiCreatedResponse({ type: ProductDto })
  async createProduct(@Body() body: CreateProductDto): Promise<ProductDto> {
    const { data } = await firstValueFrom<{ data: ProductDto }>(
      this.httpService.post(
        `${this.configService.getOrThrow('PRODUCT_SERVICE')}/products`,
        body,
      ),
    );

    return plainToInstance(ProductDto, data);
  }
}
