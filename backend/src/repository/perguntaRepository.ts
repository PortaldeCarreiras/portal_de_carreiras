import PerguntaModel, { Perguntas } from "@src/models/perguntaSchema";

export default class PerguntaRepository {
    async create(pergunta: Perguntas): Promise<Perguntas> {
        const createdPergunta = new PerguntaModel(pergunta);
        return createdPergunta.save();
    }

    async findById(id: string): Promise<Perguntas | null> {
        return PerguntaModel.findById(id).exec();
    }

    async findAll(): Promise<Perguntas[]> {
        return PerguntaModel.find().exec();
    }

    async update(id: string, pergunta: Partial<Perguntas>): Promise<Perguntas | null> {
        return PerguntaModel.findByIdAndUpdate(id, pergunta, { new: true }).exec();
    }

    async delete(id: string): Promise<Perguntas | null> {
        return PerguntaModel.findByIdAndDelete(id).exec();
    }
}
