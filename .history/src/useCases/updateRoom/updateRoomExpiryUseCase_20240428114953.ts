import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import moment from "moment";

interface IRequest {
  roomId: string;
  newExpiry: number; // The new expiry time for the room in minutes
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

      // Calculate the new expiry time using moment.js
      const newExpiryTime = moment().add(newExpiry, "minutes").toDate();

      // Update the room's expiry time
      const updatedRoom = await client.room.update({
        where: {
          id: roomId,
        },
        data: {
          expiry: newExpiryTime, // Update the room expiry time
        },
      });

      // Create a transaction for updating the expiry time
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
