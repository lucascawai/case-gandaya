import { Router } from "express";
import { OrderAdapterFactory } from "../factories/OrderAdapterFactory";

export class OrderRouter {
  static routes = (): Router => {
    const router = Router();

    const orderControllerAdapter = OrderAdapterFactory.getInstance();

    router.get("/", (req, res) => orderControllerAdapter.getOrders(req, res));
    router.get("/with-products", (req, res) =>
      orderControllerAdapter.getOrderItemsWithProducts(req, res)
    );
    router.post("/:id", (req, res) =>
      orderControllerAdapter.postOrder(req, res)
    );

    return router;
  };
}
