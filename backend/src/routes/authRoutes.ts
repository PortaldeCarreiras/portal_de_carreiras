import AuthController from "@src/controllers/authController";
import { Router } from "express";

const controller = new AuthController();

export default function authRoutes(router: Router) {
  // Rota para login de estudantes
  router.post("/auth/login/student", controller.studentLogin);

  // Rota para login de administradores
  router.post("/auth/login/admin", controller.adminLogin);
}