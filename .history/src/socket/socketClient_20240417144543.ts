import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";

interface IJoinData {
  user_id: string;
}

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  public users: { [uid: string]: string };

  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });
    this.io.on("connection", this.startListeners);
    console.info("Socket IO started");
  }
  startListeners = (socket: Socket) => {
    socket.on("join", (data: IJoinData) => {
      socket.join(data.user_id);
    });
    console.log("connection on: ", socket.id);
    socket.on("handhshake", () => {
      console.info("Handshake received from " + socket.id);
    });
    socket.on("disconnect", () => {
      console.info("Disconnect received from" + socket.id);
    });
  };
}
