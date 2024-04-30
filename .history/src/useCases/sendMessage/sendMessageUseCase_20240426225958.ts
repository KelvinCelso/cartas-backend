import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { ServerSocket } from "../../socket/socketClient";

interface IRequest {
  message: string;
  to: string;
  from: string;
}

export class SendMessageUseCase {
  public serverSocket: ServerSocket;

  constructor() {
    this.serverSocket = ServerSocket.instance;
  }

  async execute({ from, to, message }: IRequest) {
    try {
      const room = await client.room.findFirst({
        where: {
          OR: [
            { clientId: from, consultorId: to },
            { clientId: to, consultorId: from },
          ],
        },
      });

      if (!room) {
        throw new BaseError(
          "NOT FOUND",
          HttpStatusCode.NOT_FOUND,
          false,
          "Room not found for the given user IDs."
        );
      }

      const newMessage = await client.message.create({
        data: {
          message,
          to,
          from,
          roomId: room.id,
        },
      });

      this.serverSocket.io.emit("sendMessage", {
        message: newMessage,
        to,
        from,
      });

      return newMessage;
    } catch (e) {
      throw new BaseError(
        "BAD REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Could not send the message: " + e.message
      );
    }
  }
}
