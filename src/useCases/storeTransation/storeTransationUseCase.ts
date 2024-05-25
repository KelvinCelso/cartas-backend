import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

interface IRequest {
  quantity: number;
  userId: string;
}

export class StoreTransactionUseCase {
  async execute({ userId, quantity }) {
    try {
      const transaction = await client.transaction.create({
        data: {
          userId,
          value: Number(quantity),
        },
      });
      const userBalance = await client.transaction.aggregate({
        where: {
          userId: userId,
        },
        _sum: {
          value: true,
        },
      });
      
      const balance = userBalance._sum.value || 0;
      await client.user.update({
        where: {
          id: userId
        },
        data: {
          balance: balance
        }
      })
      return transaction;
    } catch (err) {
      throw new BaseError("BAD REQUEST", HttpStatusCode.BAD_REQUEST, true, err);
    }
  }
}
