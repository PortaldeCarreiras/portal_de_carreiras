import { Router } from "express";
import authRoutes from "./authRoutes";
import studentRoutes from "./studentRoutes";
import questionRoutes from "./questionRoutes";
import answerRoutes from "./answerRoutes";
import adminRoutes from "./adminRoutes";

const router = Router();

export default function routes() {
  authRoutes(router);
  studentRoutes(router);
  questionRoutes(router);
  answerRoutes(router);
  adminRoutes(router);

  return router;
}
