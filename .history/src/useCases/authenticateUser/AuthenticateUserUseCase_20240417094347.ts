import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    const userAlreadyExists = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userAlreadyExists) {
      throw new Error("User or password incorrect");
    }
    const passwordMatch = compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new BaseError(
        "FORBIDDEN",
        HttpStatusCode.UNAUTORIZED,
        false,
        "email or password is incorrect"
      );
    }
    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: 30000,
      subject: userAlreadyExists.id,
    });
    delete userAlreadyExists.password;
    return {
      user: userAlreadyExists,
      token: token,
    };
  }
}
