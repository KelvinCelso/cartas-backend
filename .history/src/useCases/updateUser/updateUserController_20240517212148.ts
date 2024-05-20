import { NextFunction, Request, Response } from 'express';
import { UpdateUserUseCase } from './updateUserUseCase';


export class UpdateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const { firstName, lastName, bio, birth_date } = request.body;

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute({
        id,
        firstName,
        lastName,
        bio,
        birth_date,
      });

      return response.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
