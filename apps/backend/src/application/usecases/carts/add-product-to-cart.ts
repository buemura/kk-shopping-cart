import { AddProductDto } from "../../dtos/add-product-dto";
import { CartsService } from "../../services/cart-service";

export class AddProductToCartUsecase {
  constructor(private readonly cartsService: CartsService) {}

  async execute({
    userId,
    cartId,
    productId,
    price,
    quantity,
  }: AddProductDto): Promise<any> {
    const { data } = await this.cartsService.addProduct({
      userId,
      cartId,
      productId,
      price,
      quantity,
    });

    return data;
  }
}
