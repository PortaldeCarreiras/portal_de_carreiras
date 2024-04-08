import { Router } from "express";
import isAuthenticated from "../middlewares/jwtAuthentication";
import { Schemas, jsonValidation } from "../middlewares/jsonValidation";
import {
  deleteUser,
  getAll,
  getById,
  patchPassword,
  patchStatus,
  register,
  update,
} from "../controllers/userController";

export default function userRoutes(router: Router) {
  router.get("/user/:id", isAuthenticated, getById);
  router.get("/user", isAuthenticated, getAll);
  router.post(
    "/user",
    isAuthenticated,
    jsonValidation(Schemas.user.create),
    register
  );
  router.put(
    "/user/:id",
    isAuthenticated,
    jsonValidation(Schemas.user.update),
    update
  );
  router.patch(
    "/user/password/:id",
    isAuthenticated,
    jsonValidation(Schemas.user.updatePassword),
    patchPassword
  );
  router.patch(
    "/user/status/:id",
    isAuthenticated,
    jsonValidation(Schemas.user.updateStatus),
    patchStatus
  );
  router.delete("/user/:id", isAuthenticated, deleteUser);
}
