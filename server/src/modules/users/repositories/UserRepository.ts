import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../types";
import {
  findOneById,
  findBalanceById,
  findOneByIdWithOrders,
  updateUserBalanceById,
} from "./methods";

export class UserRepository implements IUserRepository {
  constructor(protected readonly prisma: PrismaClient) {}

  findOneById = findOneById;
  findOneByIdWithOrders = findOneByIdWithOrders;
  findBalanceById = findBalanceById;
  updateUserBalanceById = updateUserBalanceById;
}
