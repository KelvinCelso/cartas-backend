import { NextFunction, Request, Response } from "express";
import { GetAllUsersUseCase } from "./getOneUserUseCase";

export class GetOneUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const getOneUserUseCase = new GetAllUsersUseCase();
    try {
      const id = request.params.id;
      const user = await getOneUserUseCase.execute({ id });
      return response.status(200).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
