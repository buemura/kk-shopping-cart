import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../../../src/api/product/product.controller';
import { GetAllProductsUsecase } from '../../../../src/app/product/get-all-products.usecase';
import { productsArray } from '../../../mocks/products.mocks';

describe('ProductsController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: GetAllProductsUsecase,
          useValue: {
            getAllProducts: jest.fn().mockResolvedValue(productsArray),
          },
        },
      ],
    }).compile();

    controller = module.get(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it('should get an array of products', async () => {
      await expect(controller.getAll()).resolves.toEqual(productsArray);
    });
  });
});
