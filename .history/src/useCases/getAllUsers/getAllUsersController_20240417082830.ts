import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./getAllUsersUseCase";

export class GetAllUsersController {
  async handle(request: Request, response: Response) {
    const getAllUsersUseCase = new GetAllUsersUseCase();
    const user = await getAllUsersUseCase.execute();
    return response.json(user);
  }
}
