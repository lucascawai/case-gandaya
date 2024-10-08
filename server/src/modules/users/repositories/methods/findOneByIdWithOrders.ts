import { UserRepository } from "..";

import { PrismaUser } from "../../entities/User";

export async function findOneByIdWithOrders(
  this: UserRepository,
  id: number
): Promise<PrismaUser | null> {
  return this.prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      orders: true,
    },
  });
}
