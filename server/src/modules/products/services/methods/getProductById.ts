import { PrismaProduct } from "../../entities/Product";
import { ProductExistencyError } from "../../errors";
import { ProductService } from "../ProductService";

export async function getProductById(
  this: ProductService,
  id: number
): Promise<PrismaProduct> {
  const product = this.productRepository.findOneById(id);

  if (!product) {
    throw new ProductExistencyError();
  }

  return product;
}
