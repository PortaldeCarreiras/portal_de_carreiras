import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

const EXPIRES_IN = process.env.EXPIRES_IN || "";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const SECRET = process.env.SECRET || "";

const DATABASE_URL = process.env.DATABASE_URL || "";

const config = {
  server: {
    port: Number(PORT),
  },
  token: {
    secret: SECRET,
    saltRounds: Number(SALT_ROUNDS),
    expiresIn: EXPIRES_IN,
  },
  database: {
    url: DATABASE_URL,
  },
};

export default config;
