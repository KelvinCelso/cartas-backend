import { NextFunction, Request, Response } from "express";
import { GetRoomByClientAndConsultorUseCase } from "./getRoomByClientAndConsultorUseCase";

export class GetRoomByClientAndConsultorController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { clientId, consultorId } = request.query;

      const getRoomByClientAndConsultorUseCase =
        new GetRoomByClientAndConsultorUseCase();

      const room = await getRoomByClientAndConsultorUseCase.execute({
        clientId,
        consultorId,
      });

      response.status(200).json(room);
    } catch (err) {
      console.error(err);

      next(err);
    }
  }
}
