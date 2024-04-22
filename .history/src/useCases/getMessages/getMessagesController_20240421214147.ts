import { NextFunction, Request, Response } from "express";
import { GetMessagesUseCase } from "./getMessagesUseCase";

export class GetMessagesController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { sender, receiver } = request.query;
      const getMessagesUseCase = new GetMessagesUseCase();

      const messages = await getMessagesUseCase.execute({
        userFirst: sender,
        userSecond: receiver,
      });
      return messages;
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
