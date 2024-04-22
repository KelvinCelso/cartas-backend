import { client } from "../../prisma/client";
import {
  APIError,
  BaseError,
  HttpStatusCode,
} from "../../providers/errorProvider";
import { io } from "../../server";
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
      const newmessage = await client.message.create({
        data: {
          message,
          to,
          from,
        },
      });

      this.serverSocket.io.emit("sendMessage", {
        message: newmessage,
        to: to,
      });

      return newmessage;
    } catch (e) {
      throw new BaseError(
        "BAD REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Could not send the message"
      );
    }
  }
}
