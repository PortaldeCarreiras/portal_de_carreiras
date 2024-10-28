import mongoose, { Schema, Document } from "mongoose";


interface Answer extends Document {
    id_aluno: string;
    id_pergunta: string;
    resposta: string;
    version: string; // For each question, only the version will matter on changes 
    data_resposta: Date;
};
const AnswerSchema: Schema = new Schema({
    id_aluno: { type: String, required: true },
    id_pergunta: { type: String, required: true },
    resposta: { type: String, required: true },
    version: { type: String, required: true },
    data_resposta: { type: Date, required: true }
});

const AnswersModel = mongoose.model<Answer>("Answer", AnswerSchema);

export default AnswersModel;
export type { Answer }; 