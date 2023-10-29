import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../../../src/api/cart/cart.controller';
import { CartsService } from '../../apps/cart/carts.service';

describe.skip('CartsController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartsService],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
