import { DataBaseFactory } from "../../../prisma/factory";
import { OrderRepository } from "../repositories";
import { IOrderRepository } from "../types";

export class OrderRepositoryFactory {
  private constructor() {}

  static getInstance(): IOrderRepository {
    return new OrderRepository(DataBaseFactory.getPrismaInstance());
  }
}
