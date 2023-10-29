import { Test, TestingModule } from '@nestjs/testing';

import { ProductController } from '@api/product/product.controller';
import { CreateProductUsecase } from '@app/product';
import { GetAllProductsUsecase } from '@app/product/get-all-products.usecase';
import { mockProduct, productsArray } from '../../../mocks/products.mocks';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: GetAllProductsUsecase,
          useValue: {
            execute: jest.fn().mockResolvedValue(productsArray),
          },
        },
        {
          provide: CreateProductUsecase,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockProduct),
          },
        },
      ],
    }).compile();

    controller = module.get(ProductController);
  });

  describe('getAll()', () => {
    it('should get an array of products', async () => {
      await expect(controller.getAll()).resolves.toEqual(productsArray);
    });
  });
});
