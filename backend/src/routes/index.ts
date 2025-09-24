import { Router } from "express";
import authRoutes from "./authRoutes";
import studentRoutes from "./studentRoutes";
import questionRoutes from "./questionRoutes";
import answerRoutes from "./answerRoutes";
import adminRoutes from "./adminRoutes";
import formRoutes from "./formRoutes";
import exportRoutes from "./exportRoutes";

const router = Router();

export default function routes() {
  authRoutes(router);
  studentRoutes(router);
  questionRoutes(router);
  answerRoutes(router);
  adminRoutes(router);
  formRoutes(router);
  exportRoutes(router);

  return router;
}
