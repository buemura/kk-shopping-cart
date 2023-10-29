import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dtos/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async getProducts(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.configService.getOrThrow('PRODUCT_SERVICE')}/products`,
      ),
    );

    return data;
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.configService.getOrThrow('PRODUCT_SERVICE')}/products`,
        body,
      ),
    );

    return data;
  }
}
