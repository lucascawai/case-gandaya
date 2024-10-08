import { Request, Response } from "express";
import { OrderAdapter } from "../OrderAdapter";

export async function getOrderItemsWithProducts(
  this: OrderAdapter,
  req: Request<any>,
  res: Response
): Promise<void> {
  const response = await this.controller.getOrderItemsWithProducts();

  const { status, json } = response;

  res.status(status).json(json);
}
