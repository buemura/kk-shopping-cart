import axios from "axios";
import { Product } from "../../../application/entities/product";
import { ExternalApiResponse } from "../../../application/interfaces/services";
import { ProductsService } from "../../../application/services/products-service";
import { AppError } from "../../../helpers/errors/app-error";

const productsApiURL =
  process.env.PRODUCT_API_URL ?? "http://localhost:8081/api";

export class ProductsAPI implements ProductsService {
  async getProductsList(): Promise<ExternalApiResponse<Product[]>> {
    try {
      const { status, data } = await axios.get<Product[]>(
        `${productsApiURL}/products`
      );
      return {
        status,
        data,
      };
    } catch (error: any) {
      throw new AppError(
        `/GET Products API request error: ${JSON.stringify(
          error.response.data
        )}`,
        error.response.status
      );
    }
  }
}
