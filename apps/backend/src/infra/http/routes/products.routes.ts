import { Request, Response, Router } from "express";
import { makeProductsController } from "../factories/make-products-controller";

const routers = Router();

const productsController = makeProductsController();

routers.get("/products", (request: Request, response: Response) => {
  return productsController.getProducts(request, response);
});

export { routers as productsRouters };
