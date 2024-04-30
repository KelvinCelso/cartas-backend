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
    const userBalance = await client.transaction.aggregate({
      where: {
        userId: user.id,
      },
      _sum: {
        value: true,
      },
    });

    const balance = userBalance._sum.value || 0;
    delete user.password;
    return { ...user, balance };
  }
}
