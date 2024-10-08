import { Router } from "express";
import { UserAdapterFactory } from "../factories/UserAdapterFactory";

export class UserRouter {
  static routes = (): Router => {
    const router = Router();

    const userAdapter = UserAdapterFactory.getInstance();

    router.get("/:id", (req, res) => userAdapter.getUserById(req, res));
    router.get("/:id/orders", (req, res) =>
      userAdapter.getUserByIdWithOrders(req, res)
    );
    router.get("/:id/check-balance", (req, res) =>
      userAdapter.checkUserBalanceById(req, res)
    );

    return router;
  };
}
