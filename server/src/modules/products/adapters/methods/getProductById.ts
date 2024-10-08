import { Request, Response } from "express";
import { ProductAdapter } from "..";

export async function getProductById(
  this: ProductAdapter,
  req: Request<any>,
  res: Response
): Promise<void> {
  const response = await this.controller.getProductById(
    parseInt(req.params.id)
  );

  const { status, json } = response;

  res.status(status).json(json);
}
