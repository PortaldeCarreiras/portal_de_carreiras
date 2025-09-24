import FormRepository from '../repository/formRepository';
import { Formulario } from '../models/formSchema';

export default class FormsService {
    private formRepository: FormRepository;

    constructor() {
        this.formRepository = new FormRepository();
    }

    async createForm(data: Partial<Formulario>): Promise<Formulario> {
        await this.formRepository.deactivateAllForms();
        return this.formRepository.create({ ...data, ativo: true });
    }

    async getFormById(id: string): Promise<Formulario | null> {
        return this.formRepository.findById(id);
    }

    async getAllForms(): Promise<Formulario[]> {
        return this.formRepository.findAll();
    }

    async updateForm(id: string, data: Partial<Formulario>): Promise<Formulario | null> {
        if (data.ativo === true) {
            await this.formRepository.deactivateAllForms(); // turn off all before activating
        }
        return this.formRepository.update(id, data);
    }
}