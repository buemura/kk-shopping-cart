import axios from "axios";
import { AddProductDto } from "../../../application/dtos/add-product-dto";
import { GetCartDto } from "../../../application/dtos/get-cart-dto";
import { RemoveProductDto } from "../../../application/dtos/remove-product-dto";
import { Cart } from "../../../application/entities/cart";
import { ExternalApiResponse } from "../../../application/interfaces/services";
import { CartsService } from "../../../application/services/cart-service";
import { AppError } from "../../../helpers/errors/app-error";

const cartsApiURL = process.env.CART_API_URL ?? "http://localhost:8082/api";

export class CartsAPI implements CartsService {
  async getCart({
    userId,
    cartId,
  }: GetCartDto): Promise<ExternalApiResponse<Cart>> {
    try {
      const { status, data } = await axios.get<Cart>(
        `${cartsApiURL}/users/${userId}/carts/${cartId}`
      );

      return { status, data };
    } catch (error: any) {
      throw new AppError(
        `/GET Carts API request error: ${JSON.stringify(error.response.data)}`,
        error.response.status
      );
    }
  }

  async addProduct({
    userId,
    cartId,
    productId,
    price,
    quantity,
  }: AddProductDto): Promise<ExternalApiResponse<any>> {
    try {
      const { status, data } = await axios.post<Cart>(
        `${cartsApiURL}/users/${userId}/carts/${cartId}`,
        {
          productId,
          price,
          quantity,
        }
      );
      return { status, data };
    } catch (error: any) {
      throw new AppError(
        `/POST Carts API request error: ${JSON.stringify(error.response.data)}`,
        error.response.status
      );
    }
  }

  async removeProduct({
    userId,
    cartId,
    productId,
  }: RemoveProductDto): Promise<ExternalApiResponse<any>> {
    try {
      const { status, data } = await axios.delete<Cart>(
        `${cartsApiURL}/users/${userId}/carts/${cartId}/products/${productId}`
      );

      return { status, data };
    } catch (error: any) {
      throw new AppError(
        `/DELETE Carts API request error: ${JSON.stringify(
          error.response.data
        )}`,
        error.response.status
      );
    }
  }
}
