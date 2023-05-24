import { CartsService } from "../../../services/cart-service";
import { GetCartUsecase } from "../get-cart";

describe.skip("GetProductListUsecase", () => {
  let cartsService: CartsService;
  let sut: GetCartUsecase;

  beforeAll(() => {
    cartsService = {
      getCart: jest.fn().mockResolvedValue({
        status: 200,
        data: {
          shoppingCartId: "64d19924-7a6e-4b4f-87a9-4e9709a60d12",
          userId: "user-001",
          totalPrice: 20,
          totalQuantity: 2,
          createdAt: "2023-04-05T15:45:00.123Z",
          updatedAt: "2023-04-05T19:13:10.613Z",
          products: [
            {
              productId: "product-001",
              price: 10,
              quantity: 1,
            },
          ],
        },
      }),
    } as unknown as CartsService;

    sut = new GetCartUsecase(cartsService);
  });

  it("should return a cart details", async () => {
    const spy = jest.spyOn(cartsService, "getCart");
    const res = await sut.execute({
      userId: "any_user_id",
      cartId: "any_cart_id",
    });

    expect(res.shoppingCartId).toBe("64d19924-7a6e-4b4f-87a9-4e9709a60d12");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });

  it("should throw when request fails", async () => {
    const spy = jest.spyOn(cartsService, "getCart").mockResolvedValue({
      status: 400,
      data: [],
    });

    await expect(
      sut.execute({
        userId: "any_user_id",
        cartId: "any_cart_id",
      })
    ).rejects.toThrow();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });
});
