import { Request } from "express";
import Result from "./result";
import JWT from "jsonwebtoken";

function parseToken(req: Request) {
  const header = req.get("Authorization");
  if (!header) {
    return new Result(new Error("No jwt provided."), 400);
  }
  const jwt = header.split(" ")[1];
  const parsedJWT = JWT.verify(jwt, process.env.JWT_SECRET!);
  if (!parsedJWT) {
    return new Result(new Error("Not authorized."), 401);
  }

  return new Result(parsedJWT, 200);
}

export default parseToken;
