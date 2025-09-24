import AnswerModel, { Answer } from "../models/answerSchema";

export default class AnswerRepository {
    async create(answer: Answer): Promise<Answer> {
        const newAnswer = new AnswerModel(answer);
        return newAnswer.save();
    };

    async findById(id_aluno: string): Promise<Answer | null> {
        return AnswerModel.findOne({ id_aluno }).populate('formulario').exec();
    };

    async findByAlunoId(id_aluno: string): Promise<Answer[]> {
        return AnswerModel.find({ id_aluno }).populate('formulario').exec();
    }

    async findAll(): Promise<Answer[]> {
        return AnswerModel.find().populate('formulario').exec();
    };

    async findLatestAnswers(): Promise<Answer[]> {
        return AnswerModel.aggregate([
            {
                $sort: { data_resposta: -1 } // Order by most recent dates
            },
            {
                $group: {
                    _id: {
                        id_aluno: "$id_aluno",
                        id_pergunta: "$id_pergunta" // Group by student and question 
                    },
                    latestAnswer: { $first: "$$ROOT" } // Gets most recent answer for each question 
                }
            },
            {
                $replaceRoot: { newRoot: "$latestAnswer" } // Replaces the root with the last document found 
            }
        ]).exec();
    };

    async findLatestAnswersBeforeDate(date: Date): Promise<Answer[]> {
        return AnswerModel.aggregate([
            {
                $match: { data_resposta: { $lte: date } } // Filter answers with date less than or equal to the provided 
            },
            {
                $sort: { data_resposta: -1 } // Orders by most recent date 
            },
            {
                $group: {
                    _id: {
                        id_aluno: "$id_aluno",
                        id_pergunta: "$id_pergunta" // Group by student and question 
                    },
                    latestAnswer: { $first: "$$ROOT" } // Gets most recent answer for each question 
                }
            },
            {
                $replaceRoot: { newRoot: "$latestAnswer" } // Replaces the root with the last document found 
            }
        ]).exec();
    }
};
