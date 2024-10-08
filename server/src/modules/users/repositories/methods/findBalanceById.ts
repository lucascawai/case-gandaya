import { UserRepository } from "..";

import { PrismaUserSelect } from "../../entities/User";

export async function findBalanceById(
  this: UserRepository,
  id: number
): Promise<PrismaUserSelect | null> {
  return this.prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      balance: true,
    },
  });
}
