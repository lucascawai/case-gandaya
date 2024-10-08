import { success, badRequest, serverError } from "../../../../helpers";
import { BaseResponse } from "../../../../types";
import { UserExistencyError } from "../../errors";
import { UserController } from "..";
import { PrismaUser } from "../../entities/User";

export async function getUserById(
  this: UserController,
  id: number
): Promise<BaseResponse<PrismaUser>> {
  try {
    const response = await this.userService.getUserById(id);

    return success(response);
  } catch (error) {
    if (error instanceof UserExistencyError) {
      return badRequest(error);
    }

    return serverError(error);
  }
}
