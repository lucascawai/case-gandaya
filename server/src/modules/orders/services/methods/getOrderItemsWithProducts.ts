import { PrismaOrderWithOrderItems } from "../../entities/Order";
import { OrderService } from "../OrderService";

export async function getOrderItemsWithProducts(
  this: OrderService
): Promise<PrismaOrderWithOrderItems[]> {
  const orders = this.orderRepository.findAllWithProducts();

  return orders;
}
