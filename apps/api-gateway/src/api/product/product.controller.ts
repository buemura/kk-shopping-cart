import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async getProducts(): Promise<any> {
    return firstValueFrom(
      this.httpService.get(
        `${this.configService.getOrThrow('PRODUCT_SERVICE')}/products`,
      ),
    );
  }
}
