import { IUserController, IUserService } from "../types";

import {
  getUserById,
  getUserByIdWithOrders,
  checkUserBalanceById,
} from "./methods";

export class UserController implements IUserController {
  constructor(protected readonly userService: IUserService) {}

  getUserById = getUserById;
  getUserByIdWithOrders = getUserByIdWithOrders;
  checkUserBalanceById = checkUserBalanceById;
}
