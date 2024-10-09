export interface IOrderRepository {
  findAll(): Promise<any[]>;
  findAllWithProducts(): Promise<any[]>;
  createOrder(
    userId: number,
    orderItems: any[],
    total: number,
    status: string
  ): Promise<any>;
}
