import { Router } from "express";
import { ProductRouter } from "../modules/products/routes/ProductRouter";
import { UserRouter } from "../modules/users/routes/UserRouter";
import { OrderRouter } from "../modules/orders/routes/OrderRouter";

export class AppRouter {
  routes = (): Router => {
    const router = Router();

    router.use("/products", ProductRouter.routes());
    router.use("/users", UserRouter.routes());
    router.use("/orders", OrderRouter.routes());

    return router;
  };
}
