import {
  PrismaOrderWithOrderItems,
  PrismaOrderWithOrderItemsWithProducts,
} from "../entities/Order";

export interface IOrderService {
  getOrders(): Promise<PrismaOrderWithOrderItems[]>;
  getOrderItemsWithProducts(): Promise<PrismaOrderWithOrderItems[]>;
  postOrder(
    userId: number,
    orderItems: any[],
    total: number,
    status: string
  ): Promise<any>;
}
