import { ProductsService } from "../../../services/products-service";
import { GetProductsListUsecase } from "../get-product-list";

describe("GetProductListUsecase", () => {
  let productsService: ProductsService;
  let sut: GetProductsListUsecase;

  beforeAll(() => {
    productsService = {
      getProductsList: jest.fn().mockResolvedValue({
        status: 200,
        data: [
          {
            productId: "642cbd0ab77945bab736f9bf",
            price: 10.99,
          },
          {
            productId: "642cbd0ab77945bab736f9c0",
            price: 22.98,
          },
        ],
      }),
    } as ProductsService;

    sut = new GetProductsListUsecase(productsService);
  });

  it("should return a list of products", async () => {
    const spy = jest.spyOn(productsService, "getProductsList");
    const res = await sut.execute();

    expect(res[0]).toHaveProperty("productId");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });

  it("should throw when request fails", async () => {
    const spy = jest
      .spyOn(productsService, "getProductsList")
      .mockImplementation(() => Promise.reject(new Error()));

    await expect(sut.execute()).rejects.toThrow();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });
});
