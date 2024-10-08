import { Request, Response } from "express";
import { UserAdapter } from "..";

export async function checkUserBalanceById(
  this: UserAdapter,
  req: Request<any>,
  res: Response
): Promise<void> {
  const response = await this.controller.checkUserBalanceById(
    parseInt(req.params.id),
    Number(req.query.amount)
  );

  const { status, json } = response;

  res.status(status).json(json);
}
