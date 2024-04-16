import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authenticateUserUseCase = new AuthenticateUserUseCase();
    const res = await authenticateUserUseCase.execute({
      email,
      password,
    });
    if (res instanceof Error)
      response.status(400).json({ message: "could not log the user in" });

    return response.json(res);
  }
}
