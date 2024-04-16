import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, email, password } = request.body;

    const authenticateUserUseCase = new CreateUserUseCase();

    const user = await authenticateUserUseCase.execute({
      username,
      email,
      password,
    });

    return response.json(user);
  }
}
