import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../types";
import { findAll, findAllWithProducts } from "./methods";

export class OrderRepository implements IOrderRepository {
  constructor(protected readonly prisma: PrismaClient) {}

  findAll = findAll;
  findAllWithProducts = findAllWithProducts;
}
