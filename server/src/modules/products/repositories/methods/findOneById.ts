import { ProductRepository } from "..";

import { PrismaProduct } from "../../entities/Product";

export async function findOneById(
  this: ProductRepository,
  id: number
): Promise<PrismaProduct | null> {
  return this.prisma.product.findUnique({
    where: {
      id: id,
    },
  });
}
