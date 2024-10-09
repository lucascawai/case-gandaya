import { IUserController } from "../../users/types";
import { IOrderAdapter, IOrderController } from "../types";

import { getOrders, getOrderItemsWithProducts, postOrders } from "./methods";

export class OrderAdapter implements IOrderAdapter {
  constructor(
    protected readonly controller: IOrderController,
    protected readonly userController: IUserController
  ) {}

  getOrders = getOrders;
  getOrderItemsWithProducts = getOrderItemsWithProducts;
  postOrder = postOrders;
}
