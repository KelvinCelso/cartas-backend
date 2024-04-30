import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

interface IRequest {
  roomId: string;
  newExpiry: number; // The new expiry time for the room
}

export class UpdateRoomExpiryUseCase {
  async execute({ roomId, newExpiry }: IRequest) {
    try {
      // Find the room by ID
      const room = await client.room.findUnique({
        where: {
          id: roomId,
        },
      });

      // Check if the room was found
      if (!room) {
        throw new BaseError(
          "NOT FOUND",
          HttpStatusCode.NOT_FOUND,
          false,
          "Room not found."
        );
      }

      // Update the room's expiry time
      console.log(new Date(Date.now());
      const updatedRoom = await client.room.update({
        where: {
          id: roomId,
        },
        data: {
          expiry: new Date(Date.now() + newExpiry * 60000), // Update the room expiry time
        },
      });

      await client.transaction.create({
        data: {
          userId: updatedRoom.clientId,
          value: Number(-newExpiry),
        },
      });
      // Return the updated room
      return updatedRoom;
    } catch (e) {
      // Handle errors and throw a BaseError
      throw new BaseError(
        "BAD REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Could not update the room expiry: " + e.message
      );
    }
  }
}
