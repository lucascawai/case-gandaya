import { PrismaUser } from "../entities/User";

export interface IUserService {
  getUserById(id: number): Promise<PrismaUser>;
  getUserByIdWithOrders(id: number): Promise<PrismaUser>;
  getUserBalanceById(id: number): Promise<PrismaUser>;
  putUserBalanceById(id: number, newBalance: number): Promise<PrismaUser>;
}
