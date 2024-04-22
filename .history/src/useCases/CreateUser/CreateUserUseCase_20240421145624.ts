import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";
import { hash } from "bcryptjs";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
interface IUserRequest {
  username: string;
  email: string;
  password: string;
  type: "CONSULTOR" | "CLIENT";
  birth_date: Date;
  bio?: string;
  firstName: string;
  lastName: string;
}

class CreateUserUseCase {
  async execute({
    username,
    email,
    password,
    bio,
    birth_date,
    type,
    firstName,
    lastName,
  }: IUserRequest) {
    try {
      const userAlreadyExists = await client.user.findUnique({
        where: {
          email: email,
        },
      });

      if (userAlreadyExists) throw new Error("user already exists");

      const passwordHash = await hash(password, 8);
      const date = new Date(birth_date).toISOString();
      const user = await client.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          bio,
          birth_date: date,
          type,
          password: passwordHash,
        },
      });
      const token = sign({}, process.env.JWT_SECRET, {
        expiresIn: "1h",
        subject: user.id,
      });
      delete user.password;
      return {
        user: user,
        token: token,
      };
    } catch (err) {
      throw new BaseError(
        "BAD REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        `erro: ${err}`
      );
    }
  }
}

export { CreateUserUseCase };
