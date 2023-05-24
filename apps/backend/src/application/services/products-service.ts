import { Product } from "../entities/product";
import { ExternalApiResponse } from "../interfaces/services";

export interface ProductsService {
  getProductsList: () => Promise<ExternalApiResponse<Product[]>>;
}
