
import mongoose, { Schema, Document, Types } from "mongoose";

interface Questions extends Document {
    _id: Types.ObjectId;
    pergunta: string;
    status_pergunta: boolean;
    categoria_pergunta: string;
    tipo_pergunta: string;
    opcoes?: string[];
}

const QuestionsSchema: Schema = new mongoose.Schema({
    pergunta: { type: String, required: true },
    status_pergunta: { type: Boolean, required: true },
    categoria_pergunta: { type: String, required: true },
    tipo_pergunta: { type: String, required: true },
    opcoes: [{ type: String, required: false }]
});

const QuestionsModel = mongoose.model<Questions>("Questions", QuestionsSchema);

export default QuestionsModel;
export type { Questions };