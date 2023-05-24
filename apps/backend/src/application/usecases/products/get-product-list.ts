import { Product } from "../../entities/product";
import { ProductsService } from "../../services/products-service";

export class GetProductsListUsecase {
  constructor(private readonly productsService: ProductsService) {}

  async execute(): Promise<Product[]> {
    const response = await this.productsService.getProductsList();
    return response.data;
  }
}
