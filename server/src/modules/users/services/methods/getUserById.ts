import { PrismaUser } from "../../entities/User";
import { UserExistencyError } from "../../errors";
import { UserService } from "../UserService";

export async function getUserById(
  this: UserService,
  id: number
): Promise<PrismaUser> {
  const user = this.UserRepository.findOneById(id);

  if (!user) {
    throw new UserExistencyError();
  }

  return user;
}
