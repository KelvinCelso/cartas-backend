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
    if (room.expiry < new Date(Date.now()))
      throw new BaseError(
        "UNAUTHORIZED",
        HttpStatusCode.UNAUTORIZED,
        false,
        "The room has expired"
      );

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
  }
}
