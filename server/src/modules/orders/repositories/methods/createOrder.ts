import { OrderRepository } from "../OrderRepository";

export async function createOrder(
  this: OrderRepository,
  userId: number,
  orderItems: any[],
  total: number,
  status: string
): Promise<any> {
  return this.prisma.order.create({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      orderItems: {
        create: orderItems,
      },
      total: total,
      status: status,
    },
  });
}
