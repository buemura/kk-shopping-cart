import { GetAllProductsUsecase } from '@app/product';
import { ProductRepository } from '@domain/product/repositories';

describe('GetAllProductsUsecase', () => {
  let getAllProductsUsecase: GetAllProductsUsecase;

  const productRepository: ProductRepository = {
    findMany: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(() => {
    getAllProductsUsecase = new GetAllProductsUsecase(productRepository);
  });

  it('should call productRepository', async () => {
    const repoSpy = jest.spyOn(productRepository, 'findMany');
    await getAllProductsUsecase.execute();
    expect(repoSpy).toHaveBeenCalledTimes(1);
  });
});
