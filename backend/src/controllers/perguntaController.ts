import { Request, Response } from "express";
import { Perguntas } from "@src/models/perguntaSchema";
import PerguntaService from "@src/services/perguntaService";

export default class PerguntaController {
  private perguntaService: PerguntaService;

  constructor() {
    this.perguntaService = new PerguntaService();
  }

  public createPergunta = async (req: Request, res: Response): Promise<void> => {
    try {
      const pergunta: Perguntas = req.body;
      const newPergunta = await this.perguntaService.createPergunta(pergunta);
      res.status(201).json(newPergunta);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getPerguntaById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const pergunta = await this.perguntaService.getPerguntaById(req.params.id);
      if (pergunta) {
        res.status(200).json(pergunta);
      } else {
        res.status(404).json({ error: "Pergunta not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getAllPerguntas = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const perguntas = await this.perguntaService.getAllPerguntas();
      res.status(200).json(perguntas);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public updatePergunta = async (req: Request, res: Response): Promise<void> => {
    try {
      const pergunta: Partial<Perguntas> = req.body;
      const updatedPergunta = await this.perguntaService.updatePergunta(
        req.params.id,
        pergunta
      );
      if (updatedPergunta) {
        res.status(200).json(updatedPergunta);
      } else {
        res.status(404).json({ error: "Pergunta not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public deletePergunta = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedPergunta = await this.perguntaService.deletePergunta(
        req.params.id
      );
      if (deletedPergunta) {
        res.status(200).json({ message: "Pergunta deleted successfully" });
      } else {
        res.status(404).json({ error: "Pergunta not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
