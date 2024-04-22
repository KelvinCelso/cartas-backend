import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

export class GetMessagesUseCase {
  async execute({ userFirst, userSecond }) {
    console.log(userFirst, "h", userSecond);
    const messages = await client.message.findMany({
      where: {
        to: userFirst,
        from: userSecond,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  }
}
