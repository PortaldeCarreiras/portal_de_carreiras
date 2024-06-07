import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const SECRET = config.token.secret;

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.toLowerCase().includes("bearer")
  )
    return res.status(401).json({ error: "Usuário não autenticado." });

  const authorizationSplit = req.headers.authorization.split(" ");
  const token = authorizationSplit[1];
  if (!token)
    return res.status(401).json({ error: "Usuário não autenticado." });

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error)
      return res.status(401).json({ error: "Usuário não autenticado." });

    res.locals.jwt = decoded;
    next();
  });
}

export default isAuthenticated;
