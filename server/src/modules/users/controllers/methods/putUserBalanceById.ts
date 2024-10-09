import { success, badRequest, serverError } from "../../../../helpers";
import { BaseResponse } from "../../../../types";
import { UserExistencyError } from "../../errors";
import { UserController } from "..";
import { NewBalance } from "../../entities/User";

export async function putUserBalanceById(
  this: UserController,
  id: number,
  total: number
): Promise<BaseResponse<NewBalance>> {
  try {
    const user = await this.userService.getUserBalanceById(id);
    const newUser = await this.userService.putUserBalanceById(
      id,
      user.balance - total
    );

    return success({ balance: newUser.balance });
  } catch (error) {
    if (error instanceof UserExistencyError) {
      return badRequest(error);
    }

    return serverError(error);
  }
}
