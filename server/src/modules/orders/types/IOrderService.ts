import {
  PrismaOrderWithOrderItems,
  PrismaOrderWithOrderItemsWithProducts,
} from "../entities/Order";

export interface IOrderService {
  getOrders(): Promise<PrismaOrderWithOrderItems[]>;
  getOrderItemsWithProducts(): Promise<PrismaOrderWithOrderItems[]>;
}
