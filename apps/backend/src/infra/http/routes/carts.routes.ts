import { Request, Response, Router } from "express";
import { makeCartsController } from "../factories/make-carts-controller";

const routers = Router();

const cartsController = makeCartsController();

routers.get(
  "/users/:userId/carts/:cartId",
  (request: Request, response: Response) => {
    return cartsController.getCart(request, response);
  }
);

routers.post(
  "/users/:userId/carts/:cartId",
  (request: Request, response: Response) => {
    return cartsController.addProduct(request, response);
  }
);

routers.delete(
  "/users/:userId/carts/:cartId/products/:productId",
  (request: Request, response: Response) => {
    return cartsController.removeProduct(request, response);
  }
);

export { routers as cartsRouters };
