import QuestionsController from "@src/controllers/questionController";
import isAuthenticated from "@src/utils/middlewares/jwtAuthentication";
import { Router } from "express";

const controller = new QuestionsController();

export default function questionsRoutes(router: Router) {
    router.get("/question/:id",  controller.getQuestionById);
    router.get("/question", controller.getAllQuestions);
    router.get("/question/active", controller.getActiveQuestions);
    router.post("/question", controller.createQuestion);
    router.put("/question/:id",  controller.updateQuestion);
    router.delete("/question/:id",  controller.deleteQuestion);
}
