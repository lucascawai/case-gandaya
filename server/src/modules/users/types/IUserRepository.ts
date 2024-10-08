export interface IUserRepository {
  findOneById(id: number): Promise<any>;
  findOneByIdWithOrders(id: number): Promise<any>;
  findBalanceById(id: number): Promise<any>;
}
