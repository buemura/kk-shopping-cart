import { AddProductDto } from "../dtos/add-product-dto";
import { GetCartDto } from "../dtos/get-cart-dto";
import { RemoveProductDto } from "../dtos/remove-product-dto";
import { Cart } from "../entities/cart";
import { ExternalApiResponse } from "../interfaces/services";

export interface CartsService {
  getCart: (data: GetCartDto) => Promise<ExternalApiResponse<Cart>>;
  addProduct: (data: AddProductDto) => Promise<ExternalApiResponse<any>>;
  removeProduct: (data: RemoveProductDto) => Promise<ExternalApiResponse<any>>;
}
