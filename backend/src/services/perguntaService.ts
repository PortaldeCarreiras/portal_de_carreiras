import { Perguntas } from "@src/models/perguntaSchema";
import PerguntaRepository from "@src/repository/perguntaRepository";

export default class PerguntaService {
    private perguntaRepository: PerguntaRepository;

    constructor() {
        this.perguntaRepository = new PerguntaRepository();
    }

    async createPergunta(pergunta: Perguntas): Promise<Perguntas> {
        return this.perguntaRepository.create(pergunta);
    }

    async getPerguntaById(id: string): Promise<Perguntas | null> {
        return this.perguntaRepository.findById(id);
    }

    async getAllPerguntas(): Promise<Perguntas[]> {
        return this.perguntaRepository.findAll();
    }

    async updatePergunta(
        id: string,
        pergunta: Partial<Perguntas>
    ): Promise<Perguntas | null> {
        const existingPergunta = await this.perguntaRepository.findById(id);
        if (!existingPergunta) {
            return null;
        }

        const updatedPergunta = { ...existingPergunta, ...pergunta };
        return this.perguntaRepository.update(id, updatedPergunta);
    }

    async deletePergunta(id: string): Promise<Perguntas | null> {
        return this.perguntaRepository.delete(id);
    }
}
