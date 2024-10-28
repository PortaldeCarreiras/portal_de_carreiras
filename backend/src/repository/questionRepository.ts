import QuestionsModel, { Questions } from "@src/models/questionSchema";

export default class QuestionsRepository {
    async create(question: Questions): Promise<Questions> {
        const newQuestions = new QuestionsModel(question);
        return newQuestions.save();
    }

    async findById(id: string): Promise<Questions | null> {
        return QuestionsModel.findById(id).exec();
    }

    async findAll(): Promise<Questions[]> {
        return QuestionsModel.find().exec();
    }

    async findActiveQuestions(): Promise<Questions[]> {
        return QuestionsModel.find({ status_pergunta: true }).exec();
    }

    async update(id: string, pergunta: Partial<Questions>): Promise<Questions | null> {
        return QuestionsModel.findByIdAndUpdate(id, pergunta, { new: true }).exec();
    }

    async delete(id: string): Promise<Questions | null> {
        return QuestionsModel.findByIdAndDelete(id).exec();
    }
}
