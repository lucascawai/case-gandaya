import { IUserService } from "../../users/types";
import { IOrderController, IOrderService } from "../types";

import { postOrder, getOrderItemsWithProducts, getOrders } from "./methods";

export class OrderController implements IOrderController {
  constructor(
    protected readonly orderService: IOrderService,
    protected readonly userService: IUserService
  ) {}

  getOrders = getOrders;
  getOrderItemsWithProducts = getOrderItemsWithProducts;
  postOrder = postOrder;
}
