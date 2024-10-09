import { PrismaUser } from "../entities/User";

export interface IUserRepository {
  findOneById(id: number): Promise<any>;
  findOneByIdWithOrders(id: number): Promise<any>;
  findBalanceById(id: number): Promise<any>;
  updateUserBalanceById(id: number, newBalance: number): Promise<any>;
}
