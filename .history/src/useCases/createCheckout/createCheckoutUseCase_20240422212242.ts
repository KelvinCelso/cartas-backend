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
    return {
      session: session.url,
    };
  }
}
