import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

export class GetMessagesUseCase {
  async execute({ userFirst, userSecond }) {
    const messages = await client.message.findMany({
      where: {
        OR: [
          { to: userFirst, from: userSecond },
          { from: userSecond, to: userFirst },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  }
}
