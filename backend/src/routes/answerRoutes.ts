import AnswerController from "../controllers/answerController";
import isAuthenticated from "../utils/middlewares/jwtAuthentication";
import { Router } from "express";

const controller = new AnswerController();

export default function answerRoutes(router: Router) {
    router.get("/answer/:id", controller.getAnswerById);
    router.get("/answer", controller.getAllAnswers);
    router.get("/answer/latest", controller.getLatestAnswers);
    router.get("/answer/latest-before-date", controller.getLatestAnswersBeforeDate);
    router.get("/answer/by-student/:id", controller.getAnswersByStudent);
    router.post("/answer", controller.createAnswer);
}
