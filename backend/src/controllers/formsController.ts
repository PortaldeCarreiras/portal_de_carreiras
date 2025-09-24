import { Request, Response } from 'express';
import FormsService from '@src/services/formsService';

export default class FormsController {
    private formsService: FormsService;

    constructor() {
        this.formsService = new FormsService();
    }

    public createForm = async (req: Request, res: Response): Promise<void> => {
        try {
            const form = await this.formsService.createForm(req.body);
            res.status(201).json(form);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    };

    public getFormById = async (req: Request, res: Response): Promise<void> => {
        try {
            const form = await this.formsService.getFormById(req.params.id);
            if (form) {
                res.status(200).json(form);
            } else {
                res.status(404).json({ error: 'Form not found' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    };

    public getAllForms = async (_req: Request, res: Response): Promise<void> => {
        try {
            const forms = await this.formsService.getAllForms();
            res.status(200).json(forms);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    };

    public updateForm = async (req: Request, res: Response): Promise<void> => {
        try {
            const updated = await this.formsService.updateForm(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    };
}