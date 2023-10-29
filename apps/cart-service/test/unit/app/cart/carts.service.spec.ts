import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsService } from '../../apps/cart/carts.service';
import { Item } from '../../../../src/infra/database/typeorm/entities/item.entity';
import { Cart } from '../../../../src/infra/database/typeorm/entities/cart.entity';

const cartProduct = {
  productId: 'product-001',
  price: 20,
  quantity: 2,
};

const oneCart = new Cart({
  shoppingCartId: '64d19924-7a6e-4b4f-87a9-4e9709a60d10',
  userId: 'user-001',
});

const oneCartProduct = {
  id: '64d19924-7a6e-4b4f-87a9-4e9709a60d13',
  cart: oneCart,
  ...cartProduct,
};

const cartsArray = [oneCart];
const cartProductsArray = [oneCartProduct];

describe('CartsService', () => {
  let service: CartsService;
  let cartRepository: Repository<Cart>;
  let cartProductsRepository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            find: jest.fn().mockResolvedValue(cartsArray),
            findOne: jest.fn().mockResolvedValue(oneCart),
            save: jest.fn().mockResolvedValue(oneCart),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn().mockResolvedValue(cartProductsArray),
            findOne: jest.fn().mockResolvedValue(oneCartProduct),
            save: jest.fn().mockResolvedValue(cartProduct),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
    cartProductsRepository = module.get<Repository<Item>>(
      getRepositoryToken(Item),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCartsByUserId()', () => {
    it('should return an array of carts by userId', async () => {
      const carts = await service.getCartsByUserId('user-001');
      expect(carts).toEqual(cartsArray);
    });
  });

  describe('getCartById()', () => {
    it('should get a single cart by id', () => {
      const repoSpy = jest.spyOn(cartRepository, 'find');
      expect(service.getCartById('user-001', 'cart-222')).resolves.toEqual(
        oneCart,
      );
      expect(repoSpy).toHaveBeenCalledTimes(1);
      repoSpy.mockClear();
    });
  });

  describe('addProduct()', () => {
    it('should successfully insert a user', async () => {
      await expect(
        service.addProduct('user-001', '64d19924-7a6e-4b4f-87a9-4e9709a60d10', {
          productId: 'product-001',
          price: 20,
          quantity: 2,
        }),
      ).resolves.not.toThrow();
    });
  });

  describe('removeProduct()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(cartProductsRepository, 'delete');
      const retVal = await service.removeProduct(
        '64d19924-7a6e-4b4f-87a9-4e9709a60d12',
        'product-001',
      );
      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(retVal).toBeUndefined();
    });
  });
});
