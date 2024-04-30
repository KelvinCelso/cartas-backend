import { BaseError, HttpStatusCode } from "../../providers/errorProvider";

import { ServerSocket } from "../../socket/socketClient";
import { io } from "../../server";
import { client } from "../../prisma/client";

interface IRequest {
  clientId: string;
  consultorId: string;
  expiry: number;
}

export class CreateRoomUseCase {
  public serverSocket: ServerSocket;
  constructor() {
    this.serverSocket = ServerSocket.instance;
  }
  async execute({ clientId, consultorId, expiry }: IRequest) {
    try {
      // Validate inputs
      if (!clientId || !consultorId) {
        throw new BaseError(
          "BAD REQUEST",
          HttpStatusCode.BAD_REQUEST,
          false,
          "Client ID and Consultor ID are required."
        );
      }

      // Check if the room already exists with the same clientId and consultorId
      const existingRoom = await client.room.findFirst({
        where: {
          clientId,
          consultorId,
        },
      });

      if (existingRoom) {
        throw new BaseError(
          "BAD REQUEST",
          HttpStatusCode.BAD_REQUEST,
          false,
          "Room already exists with the same client-consultor combination."
        );
      }

      // Create a new room
      const newRoom = await client.room.create({
        data: {
          clientId,
          consultorId,
          expiry: Date.now() + expiry,
        },
      });

      io.io.emit("roomCreated", newRoom);

      return newRoom;
    } catch (err) {
      throw new BaseError(
        "BAD REQUEST",
        HttpStatusCode.BAD_REQUEST,
        false,
        "Error creating the room: " + err.message
      );
    }
  }
}
