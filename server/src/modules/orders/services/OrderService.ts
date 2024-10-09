import { IOrderService, IOrderRepository } from "../types";

import { postOrder, getOrderItemsWithProducts, getOrders } from "./methods";

export class OrderService implements IOrderService {
  constructor(protected readonly orderRepository: IOrderRepository) {}

  getOrders = getOrders;
  getOrderItemsWithProducts = getOrderItemsWithProducts;
  postOrder = postOrder;
}
