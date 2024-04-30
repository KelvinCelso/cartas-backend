import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

interface IRequest {
  clientId: string;
  consultorId: string;
}

export class GetRoomByClientAndConsultorUseCase {
  async execute({ clientId, consultorId }: IRequest) {
    const room = await client.room.findFirst({
      where: {
        OR: [
          { clientId, consultorId },
          { clientId: consultorId, consultorId: clientId },
        ],
      },
      include: {
        client: true,
        consultor: true,
      },
    });

    if (!room) {
      throw new BaseError(
        "NOT FOUND",
        HttpStatusCode.NOT_FOUND,
        false,
        "Room not found for the given client and consultor IDs."
      );
    }

    return room;
  }
}
