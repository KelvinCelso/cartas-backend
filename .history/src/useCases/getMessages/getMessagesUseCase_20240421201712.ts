import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

export class GetMessagesUseCase {
  async execute({ userFirst, userSecond }) {
    const messages = await client.message.findMany({
      where: {
        OR: [
          { sender: userFirst, reciever: userSecond },
          { sender: userSecond, reciever: userFirst },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  }
}
