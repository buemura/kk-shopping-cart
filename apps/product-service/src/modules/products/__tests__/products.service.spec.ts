import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../products.service';
import { mockProduct, productsArray } from './mocks/productsMocks';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
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

    service = module.get(ProductsService);
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
