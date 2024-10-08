import { Router } from "express";
import { ProductAdapterFactory } from "../factories/ProductAdapterFactory";

export class ProductRouter {
  static routes = (): Router => {
    const router = Router();

    const productControllerAdapter = ProductAdapterFactory.getInstance();

    router.get("/", (req, res) =>
      productControllerAdapter.getProducts(req, res)
    );
    router.get("/:id", (req, res) =>
      productControllerAdapter.getProductById(req, res)
    );

    return router;
  };
}
