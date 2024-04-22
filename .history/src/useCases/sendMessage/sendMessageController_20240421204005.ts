import { NextFunction, Request, Response } from "express";
import { SendMessageUseCase } from "./sendMessageUseCase";

export class sendMessageController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const sendMessageUseCase = new SendMessageUseCase();
    try {
      const { from, to, message } = request.body;
      const user = await sendMessageUseCase.execute({ from, to, message });
      return response.status(200).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
