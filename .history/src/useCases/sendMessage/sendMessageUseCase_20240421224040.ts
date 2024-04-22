import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { ServerSocket } from "../../socket/socketClient";
ServerSocket;

interface IRequest {
  message: string;
  to: string;
  from: string;
}

export class SendMessageUseCase {
  async execute({ from, to, message }: IRequest) {
    try {
      // Create the message in the database
      const newMessage = await client.message.create({
        data: {
          message,
          to,
          from,
        },
      });

      // Emit the message to the recipient using ServerSocket instance
      const recipientSocket = ServerSocket.instance.users[to];
      if (recipientSocket) {
        recipientSocket.emit("receivedMessage", {
          message: newMessage,
          from,
        });
      } else {
        throw new BaseError(
          "RECIPIENT_NOT_FOUND",
          HttpStatusCode.BAD_REQUEST,
          true,
          "Recipient not found"
        );
      }

      return newMessage;
    } catch (error) {
      throw new BaseError(
        "BAD_REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
  }
}
