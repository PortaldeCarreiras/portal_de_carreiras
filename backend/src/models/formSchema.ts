import mongoose, { Document, Schema } from 'mongoose';
import { Questions } from './questionSchema';

interface Formulario extends Document {
    nome: string;
    ativo: boolean;
    data_criacao: Date;
    descricao: string;
    questions: (mongoose.Types.ObjectId[] | Questions[]);
}

const FormularioSchema: Schema = new Schema({
    nome: { type: String, required: true },
    ativo: { type: Boolean, default: false },
    data_criacao: { type: Date, default: Date.now },
    descricao: { type: String, required: false },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Questions', required: true }]
});

const FormModel = mongoose.model<Formulario>("Formulario", FormularioSchema);

export default FormModel;
export type { Formulario };