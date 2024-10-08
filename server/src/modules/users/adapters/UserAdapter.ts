import { IUserAdapter, IUserController } from "../types";

import {
  getUserById,
  getUserByIdWithOrders,
  checkUserBalanceById,
} from "./methods";

export class UserAdapter implements IUserAdapter {
  constructor(protected readonly controller: IUserController) {}

  getUserById = getUserById;
  getUserByIdWithOrders = getUserByIdWithOrders;
  checkUserBalanceById = checkUserBalanceById;
}
