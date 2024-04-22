import { client } from "../../prisma/client";
import { APIError } from "../../providers/errorProvider";
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
      io.io.emit("message", {
        message: newmessage,
      });
      return newmessage;
    } catch (e) {
      throw new APIError("Could not send the message");
    }
  }
}
