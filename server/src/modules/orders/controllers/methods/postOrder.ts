import { success, badRequest, serverError } from "../../../../helpers";
import { BaseResponse } from "../../../../types";
import { OrderExistencyError } from "../../errors";
import {
  PrismaOrderItem,
  PrismaOrderWithOrderItems,
} from "../../entities/Order";
import { OrderController } from "../OrderController";

export async function postOrder(
  this: OrderController,
  userId: number,
  orderItems: any[],
  total: number,
  isAbandoned?: boolean
): Promise<BaseResponse<PrismaOrderItem[]>> {
  try {
    const status = isAbandoned ? "abandoned" : "completed";
    const response = await this.orderService.postOrder(
      userId,
      orderItems,
      total,
      status
    );

    return success(response);
  } catch (error) {
    if (error instanceof OrderExistencyError) {
      return badRequest(error);
    }

    return serverError(error);
  }
}
