import { Router } from "express";
import authRoutes from "./authRoutes";
import studentRoutes from "./studentRoutes";
import perguntaRoutes from "./perguntaRoutes";

const router = Router();

export default function routes() {
  authRoutes(router);
  studentRoutes(router);
  perguntaRoutes(router);

  return router;
}
