
import { Answer } from "../models/answerSchema";
import AnswerRepository from "../repository/answerRepository";

export default class AnswerService {
    private answerRepository: AnswerRepository;

    constructor() {
        this.answerRepository = new AnswerRepository();
    };

    async createAnswer(resposta: Answer): Promise<Answer> {
        return this.answerRepository.create(resposta)
    };

    async getAnswerById(id: string): Promise<Answer | null> {
        return this.answerRepository.findById(id)
    };

    async getAnswersByStudent(id_aluno: string): Promise<Answer[]> {
        return this.answerRepository.findByAlunoId(id_aluno);
    }

    async getAllAnswers(): Promise<Answer[]> {
        return this.answerRepository.findAll();
    };

    async getLatestAnswers(): Promise<Answer[]> {
        return this.answerRepository.findLatestAnswers();
    };

    async getLatestAnswersBeforeDate(date: Date): Promise<Answer[]> {
        return this.answerRepository.findLatestAnswersBeforeDate(date);
    };
}
