import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { io, server } from "../../server";
import { ServerSocket } from "../../socket/socketClient";

interface IRequest {
  user_id;
}
export class CreateRoomrUseCase {
  async execute({ user_id }: IRequest) {
    try {
      io.io.emit("join", { user_id: user_id });
    } catch (err) {
      throw new BaseError(
        "BAD REQUEST",
        HttpStatusCode.BAD_REQUEST,
        false,
        "erro creating the room"
      );
    }
  }
}
