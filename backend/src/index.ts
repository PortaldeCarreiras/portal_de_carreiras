import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import http from "http";
import routes from "./routes";
import config from "./utils/config/config";
import mongoose from "mongoose";

const port = config.server.port;
const databaseUrl = config.database.url;

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority"
    }
  })
  .then((data) => {
    start();
  })
  .catch((error) => {
    console.log(error);
  });

function start() {
  const app = express();

  app.use(cors());

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: "50mb" }));

  app.use("/", routes());

  const server = http.createServer(app);

  server.listen(port, () => console.log(`Server running on port ${port}`));
}
