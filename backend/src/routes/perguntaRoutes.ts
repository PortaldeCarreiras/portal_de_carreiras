// routes/perguntaRoutes.ts
import PerguntaController from "@src/controllers/perguntaController";
import isAuthenticated from "@src/utils/middlewares/jwtAuthentication";
import { Router } from "express";

const controller = new PerguntaController();

export default function perguntaRoutes(router: Router) {
    router.get("/pergunta/:id", isAuthenticated, controller.getPerguntaById);
    router.get("/pergunta", controller.getAllPerguntas);
    router.post("/pergunta", controller.createPergunta);
    router.put("/pergunta/:id", isAuthenticated, controller.updatePergunta);
    router.delete("/pergunta/:id", isAuthenticated, controller.deletePergunta);
}
