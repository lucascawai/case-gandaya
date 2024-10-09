import { IUserController, IUserService } from "../types";

import {
  getUserById,
  getUserByIdWithOrders,
  checkUserBalanceById,
  putUserBalanceById,
} from "./methods";

export class UserController implements IUserController {
  constructor(protected readonly userService: IUserService) {}

  getUserById = getUserById;
  getUserByIdWithOrders = getUserByIdWithOrders;
  checkUserBalanceById = checkUserBalanceById;
  putUserBalanceById = putUserBalanceById;
}
