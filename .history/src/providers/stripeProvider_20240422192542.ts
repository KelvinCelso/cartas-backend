import Stripe from "stripe";

export class StripePovider {
  constructor(private readonly instance: Stripe) {
    this.instance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
}
