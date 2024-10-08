import { Request, Response } from "express";

export interface IOrderAdapter {
  getOrders(req: Request, res: Response): void;
  getOrderItemsWithProducts(req: Request, res: Response): void;
}
