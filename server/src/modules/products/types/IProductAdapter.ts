import { Request, Response } from "express";

export interface IProductAdapter {
  getProductById(req: Request, res: Response): void;
  getProducts(req: Request, res: Response): void;
}
