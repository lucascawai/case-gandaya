import { PrismaOrder, PrismaOrderWithOrderItems } from "../../entities/Order";
import { OrderService } from "../OrderService";

export async function postOrder(
  this: OrderService,
  userId: number,
  orderItems: any[],
  total: number,
  status: string
): Promise<PrismaOrderWithOrderItems[]> {
  const orders = this.orderRepository.createOrder(
    userId,
    orderItems,
    total,
    status
  );

  return orders;
}
