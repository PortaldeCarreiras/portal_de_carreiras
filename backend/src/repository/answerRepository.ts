import AnswerModel, { Answer } from "@src/models/answerSchema";

export default class AnswerRepository {
    async create(answer: Answer): Promise<Answer> {
        const newAnswer = new AnswerModel(answer);
        return newAnswer.save();
    };

    async findById(id_aluno: string): Promise<Answer | null> {
        return AnswerModel.findOne({ id_aluno }).exec();
    };

    async findAll(): Promise<Answer[]> {
        return AnswerModel.find().exec();
    };

    async findByVersion(version: string): Promise<Answer[]> {
        return AnswerModel.find({ version }).exec();
    };

    async findLatestAnswers(): Promise<Answer[]> {
        return AnswerModel.aggregate([
            {
                $sort: { version: -1, data_resposta: -1 } // Ordena pela versão e data mais recente
            },
            {
                $group: {
                    _id: {
                        id_aluno: "$id_aluno",
                        id_pergunta: "$id_pergunta" // Agrupa por aluno e pergunta
                    },
                    latestAnswer: { $first: "$$ROOT" } // Pega a resposta mais recente para cada pergunta
                }
            },
            {
                $replaceRoot: { newRoot: "$latestAnswer" } // Substitui a raiz pelo último documento encontrado
            }
        ]).exec();
    };

    async findLatestAnswersBeforeDate(date: Date): Promise<Answer[]> {
        return AnswerModel.aggregate([
            {
                $match: { data_resposta: { $lte: date } } // Filtra as respostas com data menor ou igual à fornecida
            },
            {
                $sort: { version: -1, data_resposta: -1 } // Ordena pela versão e data mais recente
            },
            {
                $group: {
                    _id: {
                        id_aluno: "$id_aluno",
                        id_pergunta: "$id_pergunta" // Agrupa por aluno e pergunta
                    },
                    latestAnswer: { $first: "$$ROOT" } // Pega a resposta mais recente antes da data
                }
            },
            {
                $replaceRoot: { newRoot: "$latestAnswer" } // Substitui a raiz pelo último documento encontrado
            }
        ]).exec();
    }
};
