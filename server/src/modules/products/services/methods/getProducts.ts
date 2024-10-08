import { PrismaProduct } from "../../entities/Product";
import { ProductService } from "../ProductService";

export async function getProducts(
  this: ProductService
): Promise<PrismaProduct[]> {
  const products = this.productRepository.findAll();

  return products;
}
