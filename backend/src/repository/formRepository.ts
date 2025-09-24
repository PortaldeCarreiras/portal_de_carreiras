import FormModel, { Formulario } from '../models/formSchema';
import QuestionsModel from '../models/questionSchema';

export default class FormRepository {
    async create(data: Partial<Formulario>): Promise<Formulario> {
        const form = new FormModel(data);
        return form.save();
    }

    async findById(id: string): Promise<Formulario | null> {
        return FormModel.findById(id).populate('questions').exec();
    }

    async findAll(): Promise<Formulario[]> {
        return FormModel.find().sort({ data_criacao: -1 }).populate('questions').exec();
    }

    async update(id: string, data: Partial<Formulario>): Promise<Formulario | null> {
        return FormModel.findByIdAndUpdate(id, data, { new: true }).populate('questions').exec();
    }

    async deactivateAllForms(): Promise<void> {
        await FormModel.updateMany({}, { $set: { ativo: false } });
    }
}
