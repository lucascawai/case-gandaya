export interface IOrderRepository {
  findAll(): Promise<any[]>;
  findAllWithProducts(): Promise<any[]>;
}
