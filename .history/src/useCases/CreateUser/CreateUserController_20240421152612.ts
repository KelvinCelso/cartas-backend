import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { email, password, firstName, lastName, type, bio, birth_date } =
      request.body;

    const authenticateUserUseCase = new CreateUserUseCase();
    try {
      const user = await authenticateUserUseCase.execute({
        email,
        password,
        firstName,
        lastName,
        bio,
        type,
        birth_date,
      });

      return response.json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
