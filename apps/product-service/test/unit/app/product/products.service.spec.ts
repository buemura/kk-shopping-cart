import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Product } from '../../../../src/domain/product/entities/product';
import { GetAllProductsUsecase } from '../../../../src/app/product/get-all-products.usecase';
import { mockProduct, productsArray } from '../../../mocks/products.mocks';

describe('ProductsService', () => {
  let service: GetAllProductsUsecase;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllProductsUsecase,
        {
          provide: 'PRODUCT_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(mockProduct),
            constructor: jest.fn().mockResolvedValue(mockProduct),
            find: jest.fn().mockReturnThis(),
            select: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(GetAllProductsUsecase);
    model = module.get<Model<Product>>('PRODUCT_MODEL');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(productsArray),
    } as any);

    const products = await service.getAllProducts();
    expect(products).toEqual(productsArray);
  });
});
