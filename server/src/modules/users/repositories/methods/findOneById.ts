import { UserRepository } from "..";

import { PrismaUser } from "../../entities/User";

export async function findOneById(
  this: UserRepository,
  id: number
): Promise<PrismaUser | null> {
  return this.prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}
