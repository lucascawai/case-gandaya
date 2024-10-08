import { success, badRequest, serverError } from "../../../../helpers";
import { BaseResponse } from "../../../../types";
import { OrderExistencyError } from "../../errors";
import {
  PrismaOrderItem,
  PrismaOrderWithOrderItems,
} from "../../entities/Order";
import { OrderController } from "../OrderController";

export async function getOrders(
  this: OrderController
): Promise<BaseResponse<PrismaOrderItem[]>> {
  try {
    const response = await this.orderService.getOrders();
    const orderItems = response.flatMap(
      (order: PrismaOrderWithOrderItems) => order.orderItems
    );

    return success(orderItems);
  } catch (error) {
    if (error instanceof OrderExistencyError) {
      return badRequest(error);
    }

    return serverError(error);
  }
}
