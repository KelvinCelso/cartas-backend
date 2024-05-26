import { NextFunction, Request, Response } from "express";
import { RootObject, UpdateUserUseCase } from "./updateUserUseCase";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

interface MulterRequest extends Request {
  file?: RootObject;
}

export class UpdateUserController {
  async handle(request: MulterRequest, response: Response, next: NextFunction) {
    upload.single('photo')(request, response, async (err) => {
      if (err) {
        return next(err);
      }

      try {
        const { id } = request.params;
        const { firstName, lastName, bio, expertise } = request.body;
        const photo = request.file;
        console.log(firstName, lastName, expertise)
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
    });
  }
}
