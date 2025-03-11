import { Questions } from "@src/models/questionSchema";
import QuestionsRepository from "@src/repository/questionRepository";

export default class QuestionsService {
    private questionsRepository: QuestionsRepository;

    constructor() {
        this.questionsRepository = new QuestionsRepository();
    }

    async createQuestion(pergunta: Questions): Promise<Questions> {
        return this.questionsRepository.create(pergunta);
    }

    async getQuestionById(id: string): Promise<Questions | null> {
        return this.questionsRepository.findById(id);
    }

    async getAllQuestions(): Promise<Questions[]> {
        return this.questionsRepository.findAll();
    }

    async getActiveQuestions(): Promise<Questions[]> {
        return this.questionsRepository.findActiveQuestions();
    }

    async updateQuestion(id: string, pergunta: Partial<Questions>): Promise<Questions | null> {

        // const existingQuestion = await this.questionsRepository.findById(id);
        // if (!existingQuestion) {
        //     return null;
        // }

        // const updatedQuestion = { ...existingQuestion, ...pergunta };
        return this.questionsRepository.update(id, pergunta);
    }

    async deleteQuestion(id: string): Promise<Questions | null> {
        return this.questionsRepository.delete(id);
    }

    async createBatchQuestions(questions: Questions[]): Promise<Questions[]> {
        return this.questionsRepository.createBatch(questions);
    }

}
