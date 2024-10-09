import { BaseResponse } from "@/src/types";
import { PrismaOrderItem } from "../entities/Order";

export interface IOrderController {
  getOrders(): Promise<BaseResponse<PrismaOrderItem[]>>;
  getOrderItemsWithProducts(): Promise<BaseResponse<PrismaOrderItem[]>>;
  postOrder(
    userId: number,
    orderItems: any[],
    total: number,
    isAbandoned?: boolean
  ): Promise<any>;
}
