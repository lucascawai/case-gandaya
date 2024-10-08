import { PrismaUser } from "../../entities/User";
import { UserExistencyError } from "../../errors";
import { UserService } from "../UserService";

export async function getUserByIdWithOrders(
  this: UserService,
  id: number
): Promise<PrismaUser> {
  const user = this.UserRepository.findOneByIdWithOrders(id);

  if (!user) {
    throw new UserExistencyError();
  }

  return user;
}
