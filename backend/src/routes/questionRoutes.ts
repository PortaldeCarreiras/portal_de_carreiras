import { Router } from "express";
import isAuthenticated from "../middlewares/jwtAuthentication";
import { Schemas, jsonValidation } from "../middlewares/jsonValidation";
import {
  getById,
  getAll,
  register,
  update,
  deleteQuestion,
  patchStatus,
  getByCategory,
} from "../controllers/questionController";

export default function questionRoutes(router: Router) {
  router.get("/question/:id", isAuthenticated, getById);
  router.get("/question", isAuthenticated, getAll);
  router.get("/question/category/:categoryId", isAuthenticated, getByCategory);
  router.post(
    "/question/:categoryId",
    isAuthenticated,
    jsonValidation(Schemas.question.create),
    register
  );
  router.patch(
    "/question/status/:id",
    isAuthenticated,
    jsonValidation(Schemas.question.updateStatus),
    patchStatus
  );
  router.put(
    "/question/:id",
    isAuthenticated,
    jsonValidation(Schemas.question.update),
    update
  );
  router.delete("/question/:id", isAuthenticated, deleteQuestion);
}
