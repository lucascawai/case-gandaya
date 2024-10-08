import { BaseResponse } from "@/src/types";
import { PrismaOrderItem } from "../entities/Order";

export interface IOrderController {
  getOrders(): Promise<BaseResponse<PrismaOrderItem[]>>;
  getOrderItemsWithProducts(): Promise<BaseResponse<PrismaOrderItem[]>>;
}
