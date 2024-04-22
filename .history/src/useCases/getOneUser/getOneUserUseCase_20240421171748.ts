import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";
import {
  APIError,
  BaseError,
  HttpStatusCode,
} from "../../providers/errorProvider";

interface IRequest {
  id: string;
}

export class GetAllUsersUseCase {
  async execute({ id }: IRequest) {
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (!user)
      throw new BaseError(
        "NOT FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        "could not find user in the database "
      );
    delete user.password;
    return user;
  }
}
