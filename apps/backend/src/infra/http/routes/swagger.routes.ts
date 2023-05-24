import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "../config/swagger";

const routers = Router();

routers.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export { routers as swaggerRouter };
