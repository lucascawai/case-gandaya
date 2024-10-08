import { Request, Response } from "express";

export interface IUserAdapter {
  getUserById(req: Request, res: Response): void;
  getUserByIdWithOrders(req: Request, res: Response): void;
  checkUserBalanceById(req: Request, res: Response): void;
}
