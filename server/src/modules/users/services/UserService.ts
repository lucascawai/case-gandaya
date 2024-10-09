import { IUserService, IUserRepository } from "../types";

import {
  getUserById,
  getUserBalanceById,
  getUserByIdWithOrders,
  putUserBalanceById,
} from "./methods";

export class UserService implements IUserService {
  constructor(protected readonly UserRepository: IUserRepository) {}

  getUserById = getUserById;
  getUserByIdWithOrders = getUserByIdWithOrders;
  getUserBalanceById = getUserBalanceById;
  putUserBalanceById = putUserBalanceById;
}
