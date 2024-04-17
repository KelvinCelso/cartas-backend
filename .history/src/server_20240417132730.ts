import { NextFunction, Request, Response } from "express";
import * as express from "express";

import "express-async-errors";
import * as dotenv from "dotenv";
import { router } from "./routes";
import * as http from "http";
import cors from "cors";
import * as socketio from "socket.io";

dotenv.config();

const app = express.default();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: "Error",
      message: error.message,
    });
  }
);

const server = app.listen(port, () =>
  console.log("Server is running on port:" + port)
);

export { server };
