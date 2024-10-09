import { Request, Response } from "express";

export interface IOrderAdapter {
  getOrders(req: Request, res: Response): void;
  getOrderItemsWithProducts(req: Request, res: Response): void;
  postOrder(req: Request, res: Response): void;
}
