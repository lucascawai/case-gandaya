import { PrismaProduct } from "../entities/Product";

export interface IProductService {
  getProductById(id: number): Promise<PrismaProduct>;
  getProducts(): Promise<PrismaProduct[]>;
}
