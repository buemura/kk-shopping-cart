import { Router } from "express";

import { appRouters } from "./app.routes";
import { cartsRouters } from "./carts.routes";
import { productsRouters } from "./products.routes";
import { swaggerRouter } from "./swagger.routes";

const routers = Router();

routers.use("/api", appRouters, swaggerRouter, productsRouters, cartsRouters);

export { routers };
