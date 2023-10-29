import { CreateProductUsecase } from '@app/product';
import { ProductRepository } from '@domain/product/repositories';

describe('CreateProductUsecase', () => {
  let createProductUsecase: CreateProductUsecase;

  const productRepository: ProductRepository = {
    findMany: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(() => {
    createProductUsecase = new CreateProductUsecase(productRepository);
  });

  it('should call productRepository', async () => {
    const productInput = {
      name: 'any_product_name',
      price: 100,
    };

    const productOutput = {
      id: 'any_id',
      name: 'any_product_name',
      price: 100,
    };

    const repoSpy = jest
      .spyOn(productRepository, 'save')
      .mockResolvedValueOnce(productOutput);

    const res = await createProductUsecase.execute(productInput);

    // expect(repoSpy).toHaveBeenCalledWith(productInput);
    expect(res).toEqual(productOutput);
  });
});
