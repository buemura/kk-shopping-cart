import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetAllProductsUsecase } from '@app/product/get-all-products.usecase';
import { Product } from '@domain/product/entities/product';
import { CreateProductUsecase } from '@app/product';
import { CreateProductDto } from './dtos/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly getAllProductsUsecase: GetAllProductsUsecase,
    private readonly createProductUsecase: CreateProductUsecase,
  ) {}

  @Get()
  @ApiOkResponse({ type: Product, isArray: true })
  async getAll(): Promise<Product[]> {
    return this.getAllProductsUsecase.execute();
  }

  @Post()
  @ApiCreatedResponse({ type: Product })
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return this.createProductUsecase.execute(body);
  }
}
