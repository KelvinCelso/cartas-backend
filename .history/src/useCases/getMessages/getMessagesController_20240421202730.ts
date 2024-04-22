import { NextFunction, Request, Response } from "express";
import { GetMessagesUseCase } from "./getMessagesUseCase";

export class GetMessagesController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { sender, receiver } = request.headers;
      const getMessagesUseCase = new GetMessagesUseCase();
      await getMessagesUseCase.execute({
        userFirst: sender,
        userSecond: receiver,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
