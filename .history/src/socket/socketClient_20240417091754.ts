import * as socketio from "socket.io";
import { server } from "../server";

export const io = new socketio.Server(server);
