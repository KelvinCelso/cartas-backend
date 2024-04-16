import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";
import { hash } from "bcryptjs";
interface IUserRequest {
  username: string;
  email: string;
  password: string;
}
class CreateUserUseCase {
  async execute({ username, email, password }: IUserRequest) {
    const userAlreadyExists = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) throw new Error("user already exists");

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        username,
        email,
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
  }
}

export { CreateUserUseCase };
