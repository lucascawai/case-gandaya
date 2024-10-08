import { PrismaClient } from "@prisma/client";
import { IProductRepository } from "../types";
import { findOneById, findAll } from "./methods";

export class ProductRepository implements IProductRepository {
  constructor(protected readonly prisma: PrismaClient) {}

  findOneById = findOneById;
  findAll = findAll;
}
