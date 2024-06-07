import bcrypt from "bcrypt";
import config from "../config/config";

const saltRounds = config.token.saltRounds;

export default async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}
