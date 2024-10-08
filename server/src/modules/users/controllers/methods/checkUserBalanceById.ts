import { success, badRequest, serverError } from "../../../../helpers";
import { BaseResponse } from "../../../../types";
import { UserExistencyError } from "../../errors";
import { UserController } from "..";
import { HasSufficientBalance } from "../../entities/User";

export async function checkUserBalanceById(
  this: UserController,
  id: number,
  amountToCheck: number
): Promise<BaseResponse<HasSufficientBalance>> {
  try {
    const user = await this.userService.getUserBalanceById(id);

    const hasSufficientBalance = user.balance >= amountToCheck;

    return success({ hasSufficientBalance });
  } catch (error) {
    if (error instanceof UserExistencyError) {
      return badRequest(error);
    }

    return serverError(error);
  }
}
