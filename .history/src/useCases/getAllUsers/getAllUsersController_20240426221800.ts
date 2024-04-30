import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./getAllUsersUseCase";

export class GetAllUsersController {
  async handle(request: Request, response: Response) {
    const { query } = request.query;
    const getAllUsersUseCase = new GetAllUsersUseCase();
    const user = await getAllUsersUseCase.execute({ query: query });
    return response.json(user);
  }
}
