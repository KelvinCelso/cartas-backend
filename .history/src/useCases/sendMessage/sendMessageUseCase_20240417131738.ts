import { client } from "../../prisma/client";
import { APIError } from "../../providers/errorProvider";

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
      return newmessage;
    } catch (e) {
      throw new APIError();
    }
  }
}
