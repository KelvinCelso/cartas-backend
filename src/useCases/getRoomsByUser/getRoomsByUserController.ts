import { NextFunction, Request, Response } from "express";
import { GetRoomsByUserUseCase } from "./getRoomsByUserUseCase";

export class GetRoomsByUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      // Extract the userId from the request parameters
      const { userId } = request.params;

      // Create an instance of the GetRoomsByUserUseCase
      const getRoomsByUserUseCase = new GetRoomsByUserUseCase();

      // Execute the use case with the provided userId
      const rooms = await getRoomsByUserUseCase.execute({ userId });

      // Respond with the list of rooms and a status code of 200 (OK)
      response.status(200).json(rooms);
    } catch (err) {
      console.error(err);
      // Pass the error to the next middleware (error handler)
      next(err);
    }
  }
}
