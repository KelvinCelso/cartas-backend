import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";
import { APIError, HttpStatusCode } from "../../providers/errorProvider";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute() {
    const user = await client.user.findMany();
    if (!user)
      throw new APIError(
        "NOT FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        "could not find users in the database "
      );
    return user;
  }
}
