import { NextFunction, Request, Response } from "express";
import { CreateCheckoutUseCase } from "./createCheckoutUseCase";

export class CreateCheckoutController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const createCheckoutUseCase = new CreateCheckoutUseCase();
    try {
      const { priceId, quantity } = request.body;

      const session = await createCheckoutUseCase.execute({
        priceId: priceId,
        quantity: quantity,
      });
      return session;
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
