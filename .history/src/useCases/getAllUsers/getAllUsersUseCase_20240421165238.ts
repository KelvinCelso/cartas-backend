import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";
import {
  APIError,
  BaseError,
  HttpStatusCode,
} from "../../providers/errorProvider";

interface IRequest {
  query?: "CLIENT" | "CONSULTOR";
}

export class GetAllUsersUseCase {
  async execute({ query }: IRequest) {
    if (query) {
      const user = await client.user.findMany({
        where: {
          type: {
            equals: query,
          },
        },
      });
      if (!user)
        throw new BaseError(
          "NOT FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          "user was not found"
        );
      return user;
    }
    const user = await client.user.findMany();
    if (!user)
      throw new BaseError(
        "NOT FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        "could not find users in the database "
      );
    return user;
  }
}
