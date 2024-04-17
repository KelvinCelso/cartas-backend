import * as socketio from "socket.io";
import { server } from "../server";

export const io = new socketio.Server(server);

io.on("connection", (socket) => {
  console.log("user connected on:", socket.id);
});
