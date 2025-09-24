import { Request, Response } from 'express';
import FormModel from '../models/formSchema';
import QuestionsModel, { Questions } from '../models/questionSchema';
import AnswersModel from '../models/answerSchema';
import { json2csv } from 'json-2-csv';

export default {
    exportFormsCSV: async (req: Request, res: Response) => {
        try {
            const { formIds } = req.body;

            if (!Array.isArray(formIds) || formIds.length === 0) {
                return res.status(400).json({ error: 'formIds is required and must be a non-empty array' });
            }

            // Get all selected forms with questions
            const forms = await FormModel.find({ _id: { $in: formIds } }).populate<{ questions: Questions[] }>('questions');

            const allQuestions = Array.from(
                new Map(
                    forms.flatMap((form) =>
                        form.questions.map((q) => {
                            const question = q as Questions;
                            return [question._id.toString(), { id: question._id.toString(), pergunta: question.pergunta }];
                        })
                    )
                )
            ).map(([_, value]) => value);

            // Map of questionId to list of form names it appears in
            const questionFormMap = new Map<string, string[]>();
            for (const form of forms) {
                for (const q of form.questions) {
                    const question = q as Questions;
                    const id = question._id.toString();
                    if (!questionFormMap.has(id)) questionFormMap.set(id, []);
                    questionFormMap.get(id)?.push(form.nome);
                }
            }

            // Get all answers for selected forms
            const answers = await AnswersModel.find({ formulario: { $in: formIds } });

            // Group answers by student
            const answersByStudent: Record<string, Record<string, string>> = {};
            for (const ans of answers) {
                if (!answersByStudent[ans.id_aluno]) answersByStudent[ans.id_aluno] = {};
                answersByStudent[ans.id_aluno][ans.id_pergunta] = ans.resposta;
            }

            // Generate CSV rows
            const csvRows: any[] = [];

            // First row: header row showing which forms each question appears in
            const headerRow: Record<string, string> = {
                aluno: '',
                ...Object.fromEntries(
                    allQuestions.map(q => [q.pergunta, questionFormMap.get(q.id)?.join(', ') || ''])
                )
            };
            csvRows.push(headerRow);

            // Data rows per student
            for (const [studentId, answersMap] of Object.entries(answersByStudent)) {
                const row: Record<string, string> = { aluno: studentId };
                for (const q of allQuestions) {
                    const questionId = q.id;
                    const questionText = q.pergunta;
                    row[questionText] = answersMap[questionId] || '';
                }
                csvRows.push(row);
            }

            // Convert to CSV
            const csv = await json2csv(csvRows);

            // Send CSV file
            res.header('Content-Type', 'text/csv');
            res.attachment('respostas_formularios.csv');
            res.send(csv);
        } catch (err: any) {
            console.error('Export CSV error:', err);
            res.status(500).json({ error: 'Internal server error while generating CSV.' });
        }
    }
};
