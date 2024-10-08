import { PrismaOrder, PrismaOrderWithOrderItems } from "../../entities/Order";
import { OrderService } from "../OrderService";

export async function getOrders(
  this: OrderService
): Promise<PrismaOrderWithOrderItems[]> {
  const orders = this.orderRepository.findAll();

  return orders;
}
