import mongoose, { Schema } from "mongoose";

interface Questions {
    pergunta: string;
    status_pergunta: boolean;
    categoria_pergunta: string;
}

const QuestionsSchema = new mongoose.Schema({
    pergunta: { type: String, required: true },
    status_pergunta: { type: Boolean, required: true },
    categoria_pergunta: { type: String, required: true },
});

const QuestionsModel = mongoose.model<Questions>("Questions", QuestionsSchema);

export default QuestionsModel;
export type { Questions }