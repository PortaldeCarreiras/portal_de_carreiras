import { Router } from "express";
import authRoutes from "./authRoutes";
import studentRoutes from "./studentRoutes";

const router = Router();

export default function routes() {
  authRoutes(router);
  studentRoutes(router);

  return router;
}
