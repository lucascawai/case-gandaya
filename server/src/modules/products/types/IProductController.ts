import { BaseResponse } from "@/src/types";
import { PrismaProduct } from "../entities/Product";

export interface IProductController {
  getProductById(id: number): Promise<BaseResponse<PrismaProduct>>;
  getProducts(): Promise<BaseResponse<PrismaProduct[]>>;
}
