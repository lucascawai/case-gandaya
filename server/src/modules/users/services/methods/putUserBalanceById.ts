import { PrismaUser } from "../../entities/User";
import { UserExistencyError } from "../../errors";
import { UserService } from "../UserService";

export async function putUserBalanceById(
  this: UserService,
  id: number,
  newBalance: number
): Promise<PrismaUser> {
  const user = this.UserRepository.updateUserBalanceById(id, newBalance);

  if (!user) {
    throw new UserExistencyError();
  }

  return user;
}
