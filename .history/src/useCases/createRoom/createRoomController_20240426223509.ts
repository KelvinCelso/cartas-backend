import { NextFunction, Request, Response } from "express";
import { CreateRoomUseCase } from "./createRoomUseCase";

export class CreateRoomController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { clientId, consultorId, expiry } = request.body;

      const createRoomUseCase = new CreateRoomUseCase();

      const newRoom = await createRoomUseCase.execute({
        clientId,
        consultorId,
        expiry,
      });

      response.status(201).json(newRoom);
    } catch (err) {
      console.error(err);

      next(err);
    }
  }
}
