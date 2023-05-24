import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all products successfully',
    type: Product,
    isArray: true,
  })
  async getAll(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }
}
