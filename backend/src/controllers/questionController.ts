import { Request, Response } from "express";
import { Questions } from "../models/questionSchema";
import QuestionsService from "../services/questionService";

export default class QuestionsController {
  private questionService: QuestionsService;

  constructor() {
    this.questionService = new QuestionsService();
  }

  public createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const question: Questions = req.body;
      const newQuestion = await this.questionService.createQuestion(question);
      res.status(201).json(newQuestion);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getQuestionById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const question = await this.questionService.getQuestionById(req.params.id);
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ error: "Question not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getAllQuestions = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const questions = await this.questionService.getAllQuestions();
      res.status(200).json(questions);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getActiveQuestions = async (_req: Request, res: Response): Promise<void> => {
    try {
      const activeQuestions = await this.questionService.getActiveQuestions();
      res.status(200).json(activeQuestions);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public updateQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const question: Partial<Questions> = req.body;
      const updatedQuestion = await this.questionService.updateQuestion(
        req.params.id,
        question
      );
      if (updatedQuestion) {
        res.status(200).json(updatedQuestion);
      } else {
        res.status(404).json({ error: "Question not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedQuestion = await this.questionService.deleteQuestion(
        req.params.id
      );
      if (deletedQuestion) {
        res.status(200).json({ message: "Question deleted successfully" });
      } else {
        res.status(404).json({ error: "Question not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public createBatchQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
      const questions: Questions[] = req.body;
      const createdQuestions = await this.questionService.createBatchQuestions(questions);
      res.status(201).json(createdQuestions);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

}
