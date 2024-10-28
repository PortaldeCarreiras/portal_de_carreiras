// respostaController.ts
import { Request, Response } from "express";
import AnswerService from "@src/services/answerService";

export default class RespostaController {
    // private answerService: AnswerService;

    // constructor() {
    //     this.answerService = new AnswerService();
    // };

    // public createAnswer = async (req: Request, res: Response): Promise<void> => {
    async createAnswer(req: Request, res: Response): Promise<void> {
        try {
            const answer = req.body;
            // const newAnswer = await this.answerService.createAnswer(answer);
            const newAnswer = await new AnswerService().createAnswer(answer);
            
            res.status(201).json(newAnswer);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
            console.log("controller error");
        }
    };

    // public getAnswerById = async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         const answer = await this.answerService.getAnswerById(req.params.id);
    //         if (answer) {
    //             res.status(200).json(answer);
    //         } else {
    //             res.status(404).json({ error: "Answer not found" });
    //         }
    //     } catch (err: any) {
    //         res.status(500).json({ error: err.message });
    //         console.log("controller error");
    //     }
    // };

    // // public getAllAnswers = async (_req: Request, res: Response): Promise<void> => {
    // public async getAllAnswers(_req: Request, res: Response): Promise<void> {
    //     try {
    //         const answers = await this.answerService.getAllAnswers();
    //         res.status(200).json(answers);
    //     } catch (err: any) {
    //         res.status(500).json({ error: err.message });
    //         console.log("controller error");
    //     }
    // };

    // public getLatestAnswers = async (_req: Request, res: Response): Promise<void> => {
    //     try {
    //         const answers = await this.answerService.getLatestAnswers();
    //         res.status(200).json(answers);
    //     } catch (err: any) {
    //         res.status(500).json({ error: err.message });
    //         console.log("controller error");
    //     }
    // };

    // public getLatestAnswersBeforeDate = async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         const date = new Date(req.query.date as string);
    //         const answers = await this.answerService.getLatestAnswersBeforeDate(date);
    //         res.status(200).json(answers);
    //     } catch (err: any) {
    //         res.status(500).json({ error: err.message });
    //         console.log("controller error");
    //     }
    // };

}
