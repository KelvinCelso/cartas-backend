import { NextFunction, Request, Response } from "express";
import { stripeClient } from "../../providers/stripeProvider";
import { StoreTransactionUseCase } from "./storeTransationUseCase";
import { updateUserBalance } from "../../helpers/updateUserBalance";

export class StoreTransactionController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const storeTransactionUseCase = new StoreTransactionUseCase();
    console.log("here")
    const sig = request.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
      event = stripeClient.webhooks.constructEvent(
        request.body,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.error("Webhook error:", err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const quantity = session.metadata.quantity;
      const userId = session.metadata.userId;

      try {
        const transaction = await storeTransactionUseCase.execute({
          quantity,
          userId,
        });
        await updateUserBalance(userId);

        return response.status(200).json(transaction);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  }
}
