import { success, badRequest, serverError } from "../../../../helpers";
import { BaseResponse } from "../../../../types";
import { ProductExistencyError } from "../../errors";
import { ProductController } from "..";
import { PrismaProduct } from "../../entities/Product";

export async function getProducts(
  this: ProductController
): Promise<BaseResponse<PrismaProduct[]>> {
  try {
    const response = await this.productService.getProducts();

    return success(response);
  } catch (error) {
    if (error instanceof ProductExistencyError) {
      return badRequest(error);
    }

    return serverError(error);
  }
}
