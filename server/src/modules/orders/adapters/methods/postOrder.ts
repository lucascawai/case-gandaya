import { Request, Response } from "express";
import { OrderAdapter } from "../OrderAdapter";

export async function postOrders(
  this: OrderAdapter,
  req: Request<any>,
  res: Response
): Promise<void> {
  const userId = parseInt(req.params.id);
  const data = req.body;
  const { orderItems, total, isAbandoned } = data;

  let response;
  if (isAbandoned) {
    response = await this.controller.postOrder(
      userId,
      orderItems,
      total,
      isAbandoned
    );
  } else {
    await this.userController.putUserBalanceById(userId, total);
    response = await this.controller.postOrder(userId, orderItems, total);
  }

  const { status, json } = response;

  res.status(status).json(json);
}
