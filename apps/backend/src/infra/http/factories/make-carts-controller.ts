import { AddProductToCartUsecase } from "../../../application/usecases/carts/add-product-to-cart";
import { GetCartUsecase } from "../../../application/usecases/carts/get-cart";
import { RemoveProductFromCartUsecase } from "../../../application/usecases/carts/remove-product-from-cart";
import { CartsAPI } from "../../externals/api";
import { CartsController } from "../controllers/carts-controller";

export function makeCartsController(): CartsController {
  const cartsService = new CartsAPI();
  const getCartUsecase = new GetCartUsecase(cartsService);
  const addProductToCartUsecase = new AddProductToCartUsecase(cartsService);
  const removeProductFromCartUsecase = new RemoveProductFromCartUsecase(
    cartsService
  );
  const cartsController = new CartsController(
    getCartUsecase,
    addProductToCartUsecase,
    removeProductFromCartUsecase
  );
  return cartsController;
}
