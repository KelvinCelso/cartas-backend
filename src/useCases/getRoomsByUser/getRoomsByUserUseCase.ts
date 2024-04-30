import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

interface IRequest {
  userId: string;
}

export class GetRoomsByUserUseCase {
  async execute({ userId }: IRequest) {
    const rooms = await client.room.findMany({
      where: {
        OR: [{ clientId: userId }, { consultorId: userId }],
      },
      include: {
        consultor: true, // Include consultor details in the room
        client: true,
      },
    });

    // Return the found rooms
    return rooms;
  }
}
