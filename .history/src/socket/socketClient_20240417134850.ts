import SocketIo from "socket.io";
import { server } from "../server";

export const io = new SocketIo.Server(server);

io.on("connection", (socket) => {
  console.log("user connected on:", socket.id);
});
