import { IOrderService, IOrderRepository } from "../types";

import { getOrderItemsWithProducts, getOrders } from "./methods";

export class OrderService implements IOrderService {
  constructor(protected readonly orderRepository: IOrderRepository) {}

  getOrders = getOrders;
  getOrderItemsWithProducts = getOrderItemsWithProducts;
}
