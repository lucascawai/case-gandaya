import { UserRepository } from "..";

import { PrismaUser } from "../../entities/User";

export async function updateUserBalanceById(
  this: UserRepository,
  id: number,
  newBalance: number
): Promise<PrismaUser | null> {
  return this.prisma.user.update({
    where: {
      id: id,
    },
    data: {
      balance: newBalance,
    },
  });
}
