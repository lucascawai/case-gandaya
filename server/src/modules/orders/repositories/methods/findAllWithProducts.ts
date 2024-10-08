import { PrismaOrderWithOrderItems } from "../../entities/Order";
import { OrderRepository } from "../OrderRepository";

export async function findAllWithProducts(
  this: OrderRepository
): Promise<PrismaOrderWithOrderItems[]> {
  return this.prisma.order.findMany({
    where: {},
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
}
