import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";

interface IJoinData {
  user_id: string;
}

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  public users: { [uid: string]: Socket };

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
      if (!data.user_id || this.users[data.user_id]) {
        socket.emit("usernameError", "Invalid or duplicate username");

        socket["user_id"] = data.user_id;
        console.log(`user ${data.user_id} joined`);
        return;
      }

      this.users[data.user_id] = socket;
      console.log(this.users);
    });
    socket.on("sendmessage", (data) => {
      const recipient = this.users[data.to];
      console.log(data);
      if (recipient) {
        recipient.emit("receivedMessage", data);
        console.log(data);
      } else {
        socket.emit("messageError", "Recipient not found");
      }
    });
    socket.on("trey", (data) => {
      console.log("called");
    });
    console.log("connection on: ", socket.id);
    socket.on("handhshake", () => {
      console.info("Handshake received from " + socket.id);
    });
    socket.on("disconnect", () => {
      if (socket["user_id"]) {
        delete this.users[socket["user_id"]];
      }
      console.info("Disconnect received from" + socket);
    });
  };
}
