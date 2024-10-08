import { Prisma } from "@prisma/client";

export type PrismaOrder = Prisma.OrderGetPayload<{}>;

const orderWithOrderItems = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: { orderItems: true },
});
export type PrismaOrderWithOrderItems = Prisma.OrderGetPayload<
  typeof orderWithOrderItems
>;

export type PrismaOrderItem = Prisma.OrderItemGetPayload<{}>;

const orderWithOrderItemsWithProducts =
  Prisma.validator<Prisma.OrderDefaultArgs>()({
    include: { orderItems: { include: { product: true } } },
  });
export type PrismaOrderWithOrderItemsWithProducts = Prisma.OrderGetPayload<
  typeof orderWithOrderItemsWithProducts
>;
