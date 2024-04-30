import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { stripeClient } from "../../providers/stripeProvider";

interface IRequest {
  amount: number;
  description: string;
  priceId: string;
  quantity: number;
}

export class CreateCheckoutUseCase {
  async execute({ priceId, quantity }: IRequest) {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      metadata: {
        quantity: quantity,
      },
      mode: "payment",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    if (!session)
      throw new BaseError(
        "FORBIDDEN",
        HttpStatusCode.FORBIDDEN,
        true,
        "could not create session"
      );
    return {
      session: session.url,
    };
  }
}
