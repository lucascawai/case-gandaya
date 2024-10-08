import { IOrderAdapter, IOrderController } from "../types";

import { getOrders, getOrderItemsWithProducts } from "./methods";

export class OrderAdapter implements IOrderAdapter {
  constructor(protected readonly controller: IOrderController) {}

  getOrders = getOrders;
  getOrderItemsWithProducts = getOrderItemsWithProducts;
}
