import { Request, Response } from "express";
import { GetProductsListUsecase } from "../../../application/usecases/products/get-product-list";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class ProductsController {
  constructor(
    private readonly getProductsListUsecase: GetProductsListUsecase
  ) {}

  async getProducts(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.getProductsListUsecase.execute();
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
