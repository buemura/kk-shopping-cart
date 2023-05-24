import { Request, Response } from "express";
import { AddProductToCartUsecase } from "../../../application/usecases/carts/add-product-to-cart";
import { GetCartUsecase } from "../../../application/usecases/carts/get-cart";
import { RemoveProductFromCartUsecase } from "../../../application/usecases/carts/remove-product-from-cart";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class CartsController {
  constructor(
    private readonly getCartUsecase: GetCartUsecase,
    private readonly addProductToCartUsecase: AddProductToCartUsecase,
    private readonly removeProductFromCartUsecase: RemoveProductFromCartUsecase
  ) {}

  async getCart(request: Request, response: Response): Promise<Response> {
    const { userId, cartId } = request.params;

    try {
      const result = await this.getCartUsecase.execute({ userId, cartId });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async addProduct(request: Request, response: Response): Promise<Response> {
    const { userId, cartId } = request.params;
    const { productId, price, quantity } = request.body;

    try {
      const result = await this.addProductToCartUsecase.execute({
        userId,
        cartId,
        productId,
        price,
        quantity,
      });
      return handleHttpResponse(response, 201, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async removeProduct(request: Request, response: Response): Promise<Response> {
    const { userId, cartId, productId } = request.params;

    try {
      await this.removeProductFromCartUsecase.execute({
        userId,
        cartId,
        productId,
      });
      return handleHttpResponse(response, 204, null);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
