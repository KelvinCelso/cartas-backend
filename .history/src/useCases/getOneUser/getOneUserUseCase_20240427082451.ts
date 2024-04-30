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
        userId: user.id, // Filter by user ID
      },
      _sum: {
        value: true, // Sum the value field
      },
    });

    const balance = userBalance._sum.value || 0;
    delete user.password;
    return { ...user, balance };
  }
}
