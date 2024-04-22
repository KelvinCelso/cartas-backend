import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

export class GetMessagesUseCase {
  async execute({ userFirst, userSecond }) {
    const messages = await client.message.findMany({
      where: {
        OR: [
          {
            to: userFirst,
            from: userSecond,
          },
          {
            to: userSecond,
            from: userFirst,
          },
        ],
      },
    });
    if (!messages)
      throw new BaseError(
        "NOT FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        "There are no messages to retrieve"
      );

    return messages;
  }
}
