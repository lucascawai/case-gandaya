import { Request, Response } from "express";
import { UserAdapter } from "..";

export async function getUserByIdWithOrders(
  this: UserAdapter,
  req: Request<any>,
  res: Response
): Promise<void> {
  const response = await this.controller.getUserByIdWithOrders(
    parseInt(req.params.id)
  );

  const { status, json } = response;

  res.status(status).json(json);
}
