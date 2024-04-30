import { NextFunction, Request, Response } from "express";
import { CreateRoomUseCase } from "./createRoomUseCase";

export class CreateRoomController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { clientId, consultorId, expiry } = request.body; // Assuming the request body contains clientId and consultorId

      // Create an instance of CreateRoomUseCase
      const createRoomUseCase = new CreateRoomUseCase();

      // Execute the use case with the provided input
      const newRoom = await createRoomUseCase.execute({
        clientId,
        consultorId,
        expiry,
      });

      // Respond with the created room data and a status code of 201 (Created)
      response.status(201).json(newRoom);
    } catch (err) {
      console.error(err);
      // Pass the error to the next middleware (error handler)
      next(err);
    }
  }
}
