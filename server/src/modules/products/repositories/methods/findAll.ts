import { ProductRepository } from "..";

import { PrismaProduct } from "../../entities/Product";

export async function findAll(
  this: ProductRepository
): Promise<PrismaProduct[]> {
  return this.prisma.product.findMany({
    where: {},
  });
}
