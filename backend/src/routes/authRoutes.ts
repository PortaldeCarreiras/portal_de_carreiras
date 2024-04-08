import { Router } from "express";
import { Schemas, jsonValidation } from "../middlewares/jsonValidation";
import { login, register } from "../controllers/authController";

export default function authRoutes(router: Router) {
  router.post("/auth/login", jsonValidation(Schemas.auth.login), login);
  router.post(
    "/auth/register",
    jsonValidation(Schemas.auth.register),
    register
  );
}
