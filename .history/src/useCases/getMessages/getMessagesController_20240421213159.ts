import { NextFunction, Request, Response } from "express";
import { GetMessagesUseCase } from "./getMessagesUseCase";

export class GetMessagesController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { sender, reciever } = request.headers;
      const getMessagesUseCase = new GetMessagesUseCase();
      console.log("reciever:", reciever);
      const messages = await getMessagesUseCase.execute({
        userFirst: sender,
        userSecond: reciever,
      });
      return messages;
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
