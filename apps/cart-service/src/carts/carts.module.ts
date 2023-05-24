import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartProducts } from './entities/cart-products.entity';
import { Cart } from './entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartProducts])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
