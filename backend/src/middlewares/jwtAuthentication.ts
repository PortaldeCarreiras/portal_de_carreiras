import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { Unauthorized } from "../helpers/httpResponses";

const SECRET = config.token.secret;

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.toLowerCase().includes("bearer")
  )
    return Unauthorized(res);

  const authorizationSplit = req.headers.authorization.split(" ");
  const token = authorizationSplit[1];
  if (!token) return Unauthorized(res);

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error) return Unauthorized(res);

    res.locals.jwt = decoded;
    next();
  });
}

export default isAuthenticated;
