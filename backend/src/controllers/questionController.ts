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
      const {
        pergunta,
        status_pergunta,
        categoria_pergunta,
        tipo_pergunta,
        opcoes,
      } = req.body;

      if (
        typeof pergunta !== 'string' ||
        typeof categoria_pergunta !== 'string' ||
        typeof tipo_pergunta !== 'string' ||
        typeof status_pergunta !== 'boolean'
      ) {
        res.status(400).json({ error: 'Invalid or missing required fields' });
        return;
      }


      const validTypes = ['text', 'date', 'multiple-choice', 'checkbox'];
      if (!validTypes.includes(tipo_pergunta)) {
        res.status(400).json({ error: 'Invalid tipo_pergunta' });
        return;
      }

      // For types that require options (checkbox/multiple-choice), ensure they exist and are valid
      const requiresOptions = ['multiple-choice', 'checkbox'].includes(tipo_pergunta);
      if (requiresOptions && (!Array.isArray(opcoes) || opcoes.length === 0)) {
        res.status(400).json({ error: 'Options are required for multiple-choice or checkbox questions' });
        return;
      }

      const questionData: Partial<Questions> = {
        pergunta,
        status_pergunta,
        categoria_pergunta,
        tipo_pergunta,
        opcoes: requiresOptions ? opcoes : undefined,
      };

      // const question: Questions = req.body;
      const newQuestion = await this.questionService.createQuestion(questionData as Questions);
      res.status(201).json(newQuestion);
    } catch (err: any) {
      console.error("createQuestion error:", err.message);
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
      console.error("getQuestionById error:", err.message);
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
      console.error("getAllQuestions error:", err.message);
      res.status(500).json({ error: err.message });
    }
  };

  public getActiveQuestions = async (_req: Request, res: Response): Promise<void> => {
    try {
      const activeQuestions = await this.questionService.getActiveQuestions();
      res.status(200).json(activeQuestions);
    } catch (err: any) {
      console.error("GetActiveQuestions error:", err.message);
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
      console.error("updateQuestion error:", err.message);
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
      console.error("deleteQuestion error:", err.message);
      res.status(500).json({ error: err.message });
    }
  };

  public createBatchQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
      const questions: Questions[] = req.body;
      const createdQuestions = await this.questionService.createBatchQuestions(questions);
      res.status(201).json(createdQuestions);
    } catch (err: any) {
      console.error("createBatchQuestions error:", err.message);
      res.status(500).json({ error: err.message });
    }
  };

}
