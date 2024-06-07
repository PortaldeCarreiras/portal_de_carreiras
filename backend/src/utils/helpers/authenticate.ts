import config from "../config/config";
import jwt from "jsonwebtoken";

const secret = config.token.secret;
const expiresIn = config.token.expiresIn;

async function authenticate(data: any) {
  return jwt.sign(data, secret, { expiresIn: expiresIn });
}

export default authenticate;
