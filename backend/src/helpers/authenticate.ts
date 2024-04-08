import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";
import config from "../config/config";

const secret = config.token.secret;
const expiresIn = config.token.expiresIn;

async function authenticate(data: Users) {
  return jwt.sign(data, secret, { expiresIn: expiresIn });
}

export default authenticate;
