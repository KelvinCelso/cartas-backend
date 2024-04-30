import { client } from "../prisma/client";

async function updateUserBalance(userId: string) {
  try {
    // Calculate the sum of transactions for the given user
    const result = await client.transaction.aggregate({
      where: {
        userId: userId,
      },
      _sum: {
        value: true,
      },
    });

    // Get the sum of transactions
    const transactionSum = result._sum.value || 0;

    // Update the user's balance
    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: transactionSum,
      },
    });

    console.log(`Balance for user ${userId} updated to ${transactionSum}`);
  } catch (error) {
    console.error(`Failed to update balance for user ${userId}:`, error);
  }
}
