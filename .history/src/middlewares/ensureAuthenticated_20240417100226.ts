import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { BaseError, HttpStatusCode } from "../providers/errorProvider";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new BaseError(
      "UNAUTHORIZED",
      HttpStatusCode.UNAUTORIZED,
      true,
      "token invalid"
    );
  }
  const [, token] = authToken.split(" ");

  try {
    verify(token, process.env.JWT_SECRET);

    return next();
  } catch (err) {
    throw new BaseError(
      "UNAUTHORIZED",
      HttpStatusCode.UNAUTORIZED,
      true,
      "token invalid"
    );
  }
}
