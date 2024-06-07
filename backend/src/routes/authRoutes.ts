import AuthController from "@src/controllers/authController";
import { Router } from "express";

const controller = new AuthController();

export default function authRoutes(router: Router) {
  router.post("/auth/login", controller.login);
}
