import { BaseResponse } from "@/src/types";
import { HasSufficientBalance, NewBalance, PrismaUser } from "../entities/User";

export interface IUserController {
  getUserById(id: number): Promise<BaseResponse<PrismaUser>>;
  getUserByIdWithOrders(id: number): Promise<BaseResponse<PrismaUser>>;
  checkUserBalanceById(
    id: number,
    amountToCheck: number
  ): Promise<BaseResponse<HasSufficientBalance>>;
  putUserBalanceById(
    id: number,
    total: number
  ): Promise<BaseResponse<NewBalance>>;
}
