import { Router } from "express";
import isAuthenticated from "../middlewares/jwtAuthentication";
import { Schemas, jsonValidation } from "../middlewares/jsonValidation";
import {
  deleteQuestionCategory,
  getAll,
  getById,
  register,
  update,
} from "../controllers/questionCategoryController";

export default (router: Router) => {
  router.get("/question-category/:id", isAuthenticated, getById);
  router.get("/question-category", isAuthenticated, getAll);
  router.post(
    "/question-category",
    isAuthenticated,
    jsonValidation(Schemas.questionCategory.create),
    register
  );
  router.put(
    "/question-category/:id",
    isAuthenticated,
    jsonValidation(Schemas.questionCategory.update),
    update
  );
  router.delete(
    "/question-category/:id",
    isAuthenticated,
    deleteQuestionCategory
  );
};
