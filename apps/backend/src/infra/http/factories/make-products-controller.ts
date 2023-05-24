import { GetProductsListUsecase } from "../../../application/usecases/products/get-product-list";
import { ProductsAPI } from "../../externals/api";
import { ProductsController } from "../controllers/products-controller";

export function makeProductsController(): ProductsController {
  const productsService = new ProductsAPI();
  const getProductsListUsecase = new GetProductsListUsecase(productsService);
  const productsController = new ProductsController(getProductsListUsecase);
  return productsController;
}
