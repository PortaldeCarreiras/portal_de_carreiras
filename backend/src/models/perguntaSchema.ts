import mongoose, { Schema } from "mongoose";

interface Perguntas {
    pergunta: string;
    statusPergunta: boolean;
    categoria_pergunta: string;
}
const PerguntasSchema = new mongoose.Schema({
    pergunta: { type: String, required: true },
    statusPergunta: { type: Boolean, required: true },
    categoria_pergunta: { type: String, required: true },
});

const Perguntas = mongoose.model<Perguntas>("Pergunta", PerguntasSchema);

export default Perguntas;
export type { Perguntas }