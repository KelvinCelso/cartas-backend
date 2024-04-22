import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import * as dotenv from "dotenv";
import { router } from "./routes";
import * as http from "http";
import cors from "cors";
import * as socketio from "socket.io";
import { ServerSocket } from "./socket/socketClient";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server: http.Server = http.createServer(app);
const io = new ServerSocket(server);
app.use(cors());
app.use(express.json());

app.use(router);
// app.use(errorHandler);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: "Error",
      message: error.message,
    });
  }
);

server.listen(port, () => console.log("Server is running on port:" + port));

export { server, io };
