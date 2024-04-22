import { NextFunction, Request, Response } from "express";
import { GetAllUsersUseCase } from "./getOneUserUseCase";

export class GetOneUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const getOneUserUseCase = new GetAllUsersUseCase();
    try {
      const id = request.params.id;
      await getOneUserUseCase.execute({ id });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
