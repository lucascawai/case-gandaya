import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../types";
import { findAll, findAllWithProducts, createOrder } from "./methods";

export class OrderRepository implements IOrderRepository {
  constructor(protected readonly prisma: PrismaClient) {}

  findAll = findAll;
  findAllWithProducts = findAllWithProducts;
  createOrder = createOrder;
}
