import { NextFunction, Request, Response } from "express";
import { UpdateUserUseCase } from "./payConsultorUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const { firstName, lastName, bio, expertise, photo } = request.body;

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute({
        id,
        firstName,
        lastName,
        bio,
        expertise,
        photo,
      });

      return response.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
