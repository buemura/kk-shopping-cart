import { RemoveProductDto } from "../../dtos/remove-product-dto";
import { CartsService } from "../../services/cart-service";

interface Response {
  productId: string;
}

export class RemoveProductFromCartUsecase {
  constructor(private readonly cartsService: CartsService) {}

  async execute({
    userId,
    cartId,
    productId,
  }: RemoveProductDto): Promise<Response> {
    const { data } = await this.cartsService.removeProduct({
      userId,
      cartId,
      productId,
    });

    return {
      productId: data.productId,
    };
  }
}
