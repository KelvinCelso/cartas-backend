import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import * as dotenv from "dotenv";
import { router } from "./routes";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const corso = cors();
app.use(corso);
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
app.listen(port, () => console.log("Server is running on port:" + port));
