import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import questionRoutes from "./questionRoutes";
import questionCategoryRoutes from "./questionCategoryRoutes";

const router = Router();

export default function routes() {
  authRoutes(router);
  userRoutes(router);
  questionRoutes(router);
  questionCategoryRoutes(router);

  return router;
}
