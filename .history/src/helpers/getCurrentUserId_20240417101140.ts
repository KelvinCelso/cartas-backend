import { Request } from "express";
import { BaseError, HttpStatusCode } from "../providers/errorProvider";
import * as jwt from "jsonwebtoken";
export function getCurrentUserId(request: Request) {
  const authToken = request.headers.authorization;

  if (!authToken)
    throw new BaseError(
      "UNAUTHORIZED",
      HttpStatusCode.UNAUTORIZED,
      true,
      "token is missing"
    );
  const [, token] = authToken.split(" ");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  var userId = decoded.sub;
  return userId;
}
