import { GetCartDto } from "../../dtos/get-cart-dto";
import { Cart } from "../../entities/cart";
import { CartsService } from "../../services/cart-service";

export class GetCartUsecase {
  constructor(private readonly cartsService: CartsService) {}

  async execute({ userId, cartId }: GetCartDto): Promise<Cart> {
    const response = await this.cartsService.getCart({ userId, cartId });
    return response.data;
  }
}
