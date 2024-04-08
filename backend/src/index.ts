import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import http from "http";
import routes from "./routes";
import config from "./config/config";
import { PrismaClient } from "@prisma/client";
import { customResponseMiddleware } from "./middlewares/customResponse";

const port = config.server.port;
const app = express();

app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));

app.use(customResponseMiddleware);

app.use("/", routes());

const server = http.createServer(app);

server.listen(port, () => console.log(`Server running on port ${port}`));

const prismaClient = new PrismaClient();

export { prismaClient };
