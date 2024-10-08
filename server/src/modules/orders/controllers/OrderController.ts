import { IOrderController, IOrderService } from "../types";

import { getOrderItemsWithProducts, getOrders } from "./methods";

export class OrderController implements IOrderController {
  constructor(protected readonly orderService: IOrderService) {}

  getOrders = getOrders;
  getOrderItemsWithProducts = getOrderItemsWithProducts;
}
