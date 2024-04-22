import { client } from "../../prisma/client";
import {
  APIError,
  BaseError,
  HttpStatusCode,
} from "../../providers/errorProvider";
import { io } from "../../server";

interface IRequest {
  message: string;
  to: string;
  from: string;
}

export class SendMessageUseCase {
  async execute({ from, to, message }: IRequest) {
    try {
      const newmessage = client.message.create({
        data: {
          message,
          to,
          from,
        },
      });
      io.io.emit("sendMessage", {
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
