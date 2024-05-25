import { NextFunction, Request, Response } from "express";
import { PayConsultorUseCase } from "./payConsultorUseCase";

export class PayConsultorController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id;
      const { credit } = request.body;
      const payConsultorUseCase = new PayConsultorUseCase();
      const updatedConsultor = await payConsultorUseCase.execute({
        id,
        credit,
      });

      return response.status(200).json(updatedConsultor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
