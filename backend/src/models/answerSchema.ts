import mongoose, { Schema, Document } from "mongoose";


interface Answer extends Document {
    id_aluno: string;
    id_pergunta: string;
    resposta: string;
    formulario: mongoose.Types.ObjectId
    data_resposta: Date;
};

const AnswerSchema: Schema = new Schema({
    id_aluno: { type: String, required: true },
    id_pergunta: { type: String, required: true },
    resposta: { type: String, required: true },
    formulario: { type: Schema.Types.ObjectId, ref: 'Formulario', required: true },
    data_resposta: { type: Date, required: true }
});

const AnswersModel = mongoose.model<Answer>("Answer", AnswerSchema);

export default AnswersModel;
export type { Answer }; 