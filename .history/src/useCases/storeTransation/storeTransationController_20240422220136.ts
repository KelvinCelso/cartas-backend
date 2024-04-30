import { NextFunction, Request, Response } from "express";
import { stripeClient } from "../../providers/stripeProvider";

export class StoreTransaction {
  async handle(request: Request, response: Response, next: NextFunction) {
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
  }
}
