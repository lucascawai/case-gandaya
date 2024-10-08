import { IProductController, IProductService } from "../types";

import { getProductById, getProducts } from "./methods";

export class ProductController implements IProductController {
  constructor(protected readonly productService: IProductService) {}

  getProducts = getProducts;
  getProductById = getProductById;
}
