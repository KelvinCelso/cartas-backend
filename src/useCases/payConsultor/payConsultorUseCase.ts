import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

interface IRequest {
  id: string;
  credit: number;
}

export class PayConsultorUseCase {
  async execute({ id, credit }: IRequest) {
    const consultor = await client.user.findUnique({
      where: {
        id: id,
      },
    });

    // Check if the consultor exists
    if (!consultor) {
      throw new BaseError(
        "NOT FOUND",
        HttpStatusCode.NOT_FOUND,
        false,
        "Consultor not found"
      );
    }

    // Calculate the new credit amount
    const newCredit = consultor.credit >= credit ? consultor.credit - credit : 0;

    // Update the consultor's credit
    const updatedConsultor = await client.user.update({
      where: {
        id: id,
      },
      data: {
        credit: newCredit,
      },
    });

    return updatedConsultor;
  }
}

