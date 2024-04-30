import { NextFunction, Request, Response } from "express";
import { UpdateRoomExpiryUseCase } from "./updateRoomExpiryUseCase";

export class UpdateRoomExpiryController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      // Extract the roomId and newExpiry from the request body
      const { roomId, newExpiry } = request.body;

      // Create an instance of the UpdateRoomExpiryUseCase
      const updateRoomExpiryUseCase = new UpdateRoomExpiryUseCase();

      // Execute the use case with the provided roomId and newExpiry
      const updatedRoom = await updateRoomExpiryUseCase.execute({
        roomId,
        newExpiry,
      });

      // Respond with the updated room and a status code of 200 (OK)
      response.status(200).json(updatedRoom);
    } catch (err) {
      console.error(err);
      // Pass the error to the next middleware (error handler)
      next(err);
    }
  }
}
